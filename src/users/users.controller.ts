import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
// import { CreateuserDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async findAll(){
        return await this.usersService.findAll()
    }

    // @Post('/new')
    // async create(@Body() createuserDto: CreateuserDto){
    //     return await this.usersService.create(createuserDto)
    // }
}
