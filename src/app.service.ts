import { Injectable } from '@nestjs/common';
import { MessageService } from './rabbit-mq/message.service';

@Injectable()
export class AppService {
  constructor(private readonly messageService: MessageService) {}
  publichMessage() {
    this.messageService.publishEvent();
  }
  getHello(): string {
    return 'Hello World!';
  }
}
