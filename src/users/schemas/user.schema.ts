import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {


  @Prop()
  password:string;
  
  @Prop({ required:true, unique: true })
  email: string;
  
  @Prop()
  name :string;

  @Prop({type:Date,default:Date.now})
  last_connection : Date
  

}

export const UserSchema = SchemaFactory.createForClass(User);