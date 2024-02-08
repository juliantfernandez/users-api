import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateuserDto } from './dto/users.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>){}

    async findAll(){
        return await this.userModel.find()
    }

    async create(createuserDto: CreateuserDto){
        const {name, email, password, role} = createuserDto

        const hashedPassword = await bcrypt.hash(password, 10)

        const createUser = {
            name: name,
            email: email,
            password: hashedPassword,
            role: role 
        }

        const newUser = new this.userModel(createUser)

        return await newUser.save()
    }

    async findOne(id: string){
        return await this.userModel.findById(id)
    }

    async findByEmail(email: string){
        return await this.userModel.findOne({
            email
        })
    }
}
