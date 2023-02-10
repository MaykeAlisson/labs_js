import {
  CacheInterceptor,
  CacheKey,
  CacheTTL,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  publichMessage() {
    return this.appService.publichMessage();
  }

  @UseInterceptors(CacheInterceptor)
  @Get('/redis')
  @CacheKey('CACHE_LABS')
  getRedisAll() {
    return this.appService.getRedisAll();
  }

  @UseInterceptors(CacheInterceptor)
  @Get('/redis/:id')
  async getRedis(@Param('id') id: number) {
    return this.appService.getRedis(+id);
  }
}
