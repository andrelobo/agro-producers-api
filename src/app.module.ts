import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { ProducersModule } from './producers/producers.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true, // Carrega automaticamente todas as entidades
      synchronize: false, // Desativa a sincronização automática
      migrations: ['dist/migrations/*.js'], // Caminho para as migrações
      migrationsRun: true, // Executa migrações automaticamente ao iniciar
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Especifica as entidades explicitamente
    }),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
    ProducersModule,
    AuthModule,
    UsersModule,
  ],
  providers: [AuthService],
})
export class AppModule {}
