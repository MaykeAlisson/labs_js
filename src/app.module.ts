import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitMqModule } from './rabbit-mq/rabbit-mq.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      host: 'localhost',
      port: 6379,
      max: 10,
    }),
    RabbitMqModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
