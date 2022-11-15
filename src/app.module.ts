import { Module } from '@nestjs/common';
import HealthModule from './health/health.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    HealthModule, 
    ConfigModule.forRoot(),
    MongooseModule.forRoot(`${process.env.MONGO_CONF}://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_HOST}/${process.env.MONGO_BBDD}`), 
    UsersModule, AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
