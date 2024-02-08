import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateuserDto } from 'src/users/dto/users.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}

   @Post('/register')
   async register(@Body() register:CreateuserDto){
    return this.authService.register(register)
   }

   @Post('/login')
   async login(@Body() token): Promise<{ access_token: string }> {
       const { accessToken } = await this.authService.login(token);
       return { access_token: accessToken };
   }
}

