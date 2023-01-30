import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Global, Module } from '@nestjs/common';
import { MessageService } from './message.service';

@Global()
@Module({
  imports: [
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'labs',
          type: 'topic',
        },
      ],
      uri: 'amqp://guest:guest@localhost:5672',
    }),
    RabbitMqModule,
  ],
  providers: [MessageService],
  exports: [MessageService],
})
export class RabbitMqModule {}
