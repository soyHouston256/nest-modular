import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  providers: [
    {
      provide: 'API_KEY',
      useFactory: (configService: ConfigService) => {
        return configService.get<string>('API_KEY');
      },
      inject: [ConfigService],
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
