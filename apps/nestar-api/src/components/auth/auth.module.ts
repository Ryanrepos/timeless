import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService],
  /*
  Auth service ni AuthModel dan tashqarida ishlatish uchun export qlib olyabmiz. 
  */
  exports: [AuthService],   
})
export class AuthModule {}
