import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HttpModule, HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Module({
  imports: [
    ProductsModule,
    UsersModule,
    CustomersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'API_KEY',
      useFactory: (configService: ConfigService) => {
        return configService.get<string>('API_KEY');
      },
      inject: [ConfigService],
    },
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const request = http.get(
          'https://jsonplaceholder.typicode.com/todos/1',
        );
        const tasks = await lastValueFrom(request);
        return tasks.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
