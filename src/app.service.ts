import { Injectable, Inject } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @Inject('API_KEY') private apiKey: string,
    @Inject('TASKS') private tasks,
  ) {}
  getHello(): string {
    console.log(JSON.stringify(this.tasks));
    return `Hello World! ${this.apiKey}`;
  }

  AllTasks(): Observable<AxiosResponse<any[]>> {
    return this.tasks;
  }
}
