import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[PassportModule,
    MongooseModule.forFeature([{
      name: User.name, schema: UserSchema
    }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersModule, UsersService]
})
export class UsersModule {}
