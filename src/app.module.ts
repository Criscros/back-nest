import { Module } from '@nestjs/common';
import HealthModule from './health/health.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
  imports: [HealthModule, MongooseModule.forRoot('mongodb://mokitajar:mokitahasbeendrinking*@localhost:27017/mokita'), UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
