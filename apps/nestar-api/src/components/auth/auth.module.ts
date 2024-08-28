import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    HttpModule,
    JwtModule.register({
      secret: `${process.env.SECRET_TOKEN}`,
      signOptions: { expiresIn: '30d'},
    })
  ],
  providers: [AuthService],
  /*
  Auth service ni AuthModel dan tashqarida ishlatish uchun export qlib olyabmiz. 
  */
  exports: [AuthService],   
})
export class AuthModule {}
