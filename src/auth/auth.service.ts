import { Model } from 'mongoose';
import { HttpException, Injectable, Post, HttpStatus } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { User, UserDocument } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { hash, compare } from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService:JwtService
  ) {}


  async register(userObject: RegisterAuthDto) {
    
    const { password } = userObject
    const plainToHas  = await hash(password, 10)
    userObject = {...userObject, password:plainToHas}
    return this.userModel.create(userObject)

  }

  async login (userObjectLogin: LoginAuthDto){

    const { email, password } = userObjectLogin;
    const findUser = await this.userModel.findOne({email})
    const update = { last_connection: new Date() };

    if (!findUser) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.BAD_REQUEST);
    }

    const checkPassword = await compare(password, findUser.password);

    if(!checkPassword){
      throw new HttpException('PASSWORD_INCORRECT', HttpStatus.BAD_REQUEST);
    }

    this.userModel.findOneAndUpdate({_id:findUser._id},update)

    const payload = {id:findUser._id, name:findUser.name}
    const token =  this.jwtService.sign(payload)

    const data = {
      user : findUser, 
      token
    }

    return data

  }


}
