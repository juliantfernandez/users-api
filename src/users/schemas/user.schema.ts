import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ROLES } from "src/helpers/enum/roles.enum";


@Schema({
    timestamps: true
})
export class User {
    @Prop()
    name: string;

    @Prop({
        required: true,
        unique: true
    })
    email: string;

    @Prop()
    password:string;

    @Prop({
        default: ROLES.USER
    })
    role: ROLES;
}

export const UserSchema = SchemaFactory.createForClass(User)