import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmpleadoModule } from './empleado/empleado.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UploadModule } from './upload/upload.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { SendGridModule } from '@anchan828/nest-sendgrid';
import { EmpresaModule } from './empresa/empresa.module';
import { SucursalModule } from './sucursal/sucursal.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('HOST'),
        port: 3306,
        username: configService.getOrThrow('USER1'),
        password: configService.getOrThrow('PASSWORD'),
        database: configService.getOrThrow('DATABASE'),
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    SendGridModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        apikey: configService.getOrThrow('SENDGRID_API_KEY'),
      }),
      inject: [ConfigService],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 20,
      },
    ]),
    EmpleadoModule,
    AuthModule,
    UsersModule,
    UploadModule,
    EmpresaModule,
    SucursalModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
