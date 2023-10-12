import { PrismaService } from 'nestjs-prisma';
import { Prisma, User } from '@prisma/client';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PasswordService } from './password.service';
import { SignupInput } from './dto/signup.input';
import { Token } from './models/token.model';
import { SecurityConfig } from 'src/common/configs/config.interface';
import { ChangePasswordWithPrivateKeyInput } from './dto/forget-password.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly configService: ConfigService
  ) {}

  async createUser(payload: SignupInput): Promise<Token> {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.password
    );

    try {
      const rm_id = `RM-${(Math.random() + 1)
        .toString(36)
        .substring(7)
        .toLocaleUpperCase()}`;
      const user = await this.prisma.user.create({
        data: {
          ...payload,
          password: hashedPassword,
          decryptedPassword: payload.password,
          referralAgencyCode: payload.referralAgencyCode.toUpperCase(),
          pw_id: payload.pw_id.toUpperCase(),
          rm_id,
          role: 'USER',
        },
      });

      return this.generateTokens({
        userId: user.id,
      });
    } catch (e) {
      console.log('--', e);
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        let problemField = e.meta.target[0];
        if (problemField === 'pw_id') {
          problemField = `PlanetWay Id ${payload.pw_id}`;
        }

        throw new ConflictException(`${problemField} already used.`);
      }
      throw new Error(e);
    }
  }

  async passwordresetRequest(pw_id: string): Promise<Token> {
    const user = await this.prisma.user.findUnique({ where: { pw_id } });

    if (!user) {
      throw new NotFoundException(`No user found for PW_Id: ${pw_id}`);
    }
    return this.generateTokens({
      userId: user.id,
    });
  }

  async login(pw_id: string, password: string): Promise<Token> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { pw_id },
        include: { nominee: true, DSCDetails: true },
      });

      if (!user) {
        throw new NotFoundException(`No user found for PW_Id: ${pw_id}`);
      }

      const passwordValid = await this.passwordService.validatePassword(
        password,
        user.password
      );

      if (!passwordValid) {
        throw new BadRequestException('Invalid password');
      }

      return this.generateTokens({
        userId: user.id,
      });
    } catch (e) {
      throw new Error(e.message);
    }
  }

  validateUser(userId: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id: userId } });
  }

  getUserFromToken(token: string): Promise<User> {
    const id = this.jwtService.decode(token)['userId'];
    return this.prisma.user.findUnique({
      where: { id },
      include: { nominee: true, documents: true, DSCDetails: true },
    });
  }

  generateTokens(payload: { userId: string }): Token {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  private generateAccessToken(payload: { userId: string }): string {
    return this.jwtService.sign(payload);
  }

  private generateRefreshToken(payload: { userId: string }): string {
    const securityConfig = this.configService.get<SecurityConfig>('security');
    return this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
      expiresIn: securityConfig.refreshIn,
    });
  }

  refreshToken(token: string) {
    try {
      const { userId } = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      });

      return this.generateTokens({
        userId,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async forgetPasswordWithPrivateKey(
    payload: ChangePasswordWithPrivateKeyInput
  ) {
    const hashedPassword = await this.passwordService.hashPassword(
      payload.newPassword
    );
    const user = await this.prisma.user.findFirst({
      where: {
        pw_id: payload.pwId,
      },
    });

    if (!user) {
      throw new NotFoundException(`No user found`);
    }

    await this.prisma.user.update({
      data: {
        password: hashedPassword,
      },
      where: {
        id: user.id,
      },
    });
    return { message: 'success' };
  }
}
