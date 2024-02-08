import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from "src/users/users.service";
type JwtPayload = {
    id: string;
    name: string;
    role: string
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: '3st43sMyPubl1cK3y'
        });
    }

    async validate(payload: JwtPayload){
    
        if(!payload){
            throw new UnauthorizedException('access_token is required')
        }
        return payload
    }
}



