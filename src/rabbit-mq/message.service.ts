import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { ConsumeMessage } from 'amqplib';

@Injectable()
export class MessageService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @RabbitSubscribe({
    exchange: 'labs',
    routingKey: 'labs.posts-route',
    queue: 'labs_posts',
  })
  public async listenerQueue(msg: any, amqpMsg: ConsumeMessage) {
    console.log(`listener`);
    console.log(`Message ${JSON.stringify(msg)}`);
  }
  async publishEvent() {
    this.amqpConnection.publish('labs', 'labs.subscribes-route', {
      msg: 'hello world subscribes',
    });
  }
}
