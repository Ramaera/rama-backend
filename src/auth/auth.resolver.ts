import {
  Resolver,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './models/auth.model';
import { Token } from './models/token.model';
import { LoginInput } from './dto/login.input';
import { SignupInput } from './dto/signup.input';
import { RefreshTokenInput } from './dto/refresh-token.input';
import { Sponser, User } from 'src/users/models/user.model';
import { PasswordRequestInput } from './dto/passwordRequest.input';
import { ChangePasswordWithPrivateKeyInput } from './dto/forget-password.input';
import { EmptyModal } from 'src/common/models/empty.model';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { SponserDetails } from './dto/getDetailsOfSponser';
@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly auth: AuthService) {}

  @Mutation(() => Auth)
  async signup(
    @Args('data')
    data: SignupInput
  ) {
    data.pw_id = data.pw_id.toUpperCase();
    const { accessToken, refreshToken } = await this.auth.createUser(data);
    return {
      accessToken,
      refreshToken,
    };
  }

  @Mutation(() => Auth)
  async login(
    @Args('data')
    { pw_id, password }: LoginInput
  ) {
    return await this.auth.login(pw_id.toUpperCase(), password);
  }

  @Mutation(() => Auth)
  async passwordresetRequest(
    @Args('data')
    { pw_id }: PasswordRequestInput
  ) {
    const { accessToken } = await this.auth.passwordresetRequest(pw_id);
    return {
      accessToken,
    };
  }

  @Mutation(() => EmptyModal)
  async forgetPasswordWithPrivateKey(
    @Args('data') payload: ChangePasswordWithPrivateKeyInput
  ) {
    return this.auth.forgetPasswordWithPrivateKey(payload);
  }

  @Mutation(() => Token)
  async refreshToken(@Args() { token }: RefreshTokenInput) {
    return this.auth.refreshToken(token);
  }

  @ResolveField('user', () => User)
  async user(@Parent() auth: Auth) {
    console.log('token ,clicked');
    return await this.auth.getUserFromToken(auth.accessToken);
  }

  @Mutation(() => Sponser)
  async getSponserDetails(@Args('data') payload: SponserDetails) {
    return this.auth.getSponser(payload);
  }
}
