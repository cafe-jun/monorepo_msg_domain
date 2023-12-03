import { HttpService } from '@nestjs/axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { catchError, map, Observable, lastValueFrom } from 'rxjs';

@Injectable()
export class ApiCallService {
  constructor(private httpService: HttpService) {}

  async get<T>(url: string, query: string, headers?: any): Promise<T> {
    const result = this.httpService
      .get<T>(`${url}?${query}`, {
        headers,
      })
      .pipe(
        map((response) => {
          return response.data;
        }),
        catchError((e) => {
          throw new ForbiddenException('API not available');
        }),
      );
    return await lastValueFrom(result);
  }

  async post<T>(url: string, data?: any, headers?: any): Promise<T> {
    const result = await this.httpService
      .post<T>(url, data ? { ...data } : undefined, {
        headers: {
          ...headers,
        },
      })
      .pipe(
        map((response) => {
          return response.data;
        }),
        catchError((e) => {
          console.log('error', e);
          throw new ForbiddenException('API not available');
        }),
      );
    return await lastValueFrom(result);
  }
}
