import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { MessageService } from './rabbit-mq/message.service';

@Injectable()
export class AppService {
  constructor(
    private readonly messageService: MessageService,
    @Inject(CACHE_MANAGER) private readonly cacheService: Cache,
  ) {}

  publichMessage() {
    this.messageService.publishEvent();
  }

  getHello(): string {
    return 'Hello World!';
  }

  async getRedisAll() {
    const data = new Date();
    const register = [
      {
        nome: 'Mayke Alisson',
        data: data,
      },
      {
        nome: 'Juliana',
        data: data,
      },
    ];
    await this.cacheService.set(`CACHE_LABS`, register, 1000);
    const cachedData = await this.cacheService.get(`CACHE_LABS`);
    console.log('data set to cache all', cachedData);
    return register;
  }

  async getRedis(id: number) {
    const cachedData = await this.cacheService.get(id.toString());
    if (cachedData) {
      console.log(`Getting data from cache!`);
      return `${cachedData}`;
    }

    const data = `cache ${id} - ${new Date()}`;
    await this.cacheService.set(id.toString(), data, 1000);
    console.log(`data set to cache ${id} - `, cachedData);
    return data;
  }
}
