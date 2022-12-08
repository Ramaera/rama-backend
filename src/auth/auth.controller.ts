import {Controller,Get,Param,Post} from '@nestjs/common'
import { AuthService } from './auth.service'



@Controller()
export class AuthController {
    constructor(private readonly authService:AuthService){}
}

