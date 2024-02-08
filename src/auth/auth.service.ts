import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateuserDto } from 'src/users/dto/users.dto';
import { User } from 'src/users/schemas/user.schema';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { Login } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>, private usersService: UsersService,
    private jwtService: JwtService,){}

    async register(createuserDto: CreateuserDto) {
        const { email } = createuserDto;
    
        const user = await this.usersService.findByEmail(email);
        
        if (user) {
            return {
                message: 'Email already exists',
                status: 'error',
                statusCode: 400
            };
        }
    
        const newUser = await this.usersService.create(createuserDto);
        return {
            message: 'User created successfully',
            data: newUser,
            status: 'success',
            statusCode: 201
        };
    }

    async login({email, password}: Login) {
        const user = await this.userModel.findOne({ email: email })
        if(!user){
            throw new UnauthorizedException('The email is incorrect');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      throw new UnauthorizedException('The password is incorrect');
        const payload = {email: email,
            role: user.role,
            username: user.name,
            id: user._id,}

            return {
                accessToken: await this.jwtService.sign(payload),
              };
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (!user) throw new UnauthorizedException('The email is incorrect');
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
          throw new UnauthorizedException('The password is incorrect');
        return {
          email: user.email,
        };
      }
}
