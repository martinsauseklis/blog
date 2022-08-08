import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, throwError, catchError } from 'rxjs';
import { User } from '../authentication-service/authentication.service';

export interface UserData {
  items: User[],
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  },
  links: {
    first: string;
    previous: string;
    next: string;
    last: string;
  },
};

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { };

  findOne(id: number): Observable<User> {
    return this.http.get('/api/users/' + id).pipe(
      map((user: User) => user)
    )
  }

  updateOne(user: User): Observable<User> {
    return this.http.put('api/users/' + user.id, user)
  }

  findAll(page: number, size: number): Observable<UserData> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(size));

    return this.http.get<UserData>('/api/users', {params}).pipe(
      map((userData: UserData) => userData),
      catchError(err => throwError(() => err))
    )
  }

  paginateByName(page: number, size: number, username: string): Observable<UserData> {
    let params = new HttpParams();
    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    params = params.append('username', username);

    return this.http.get<UserData>('/api/users', {params}).pipe(
      map((userData: UserData) => userData),
      catchError(err => throwError(() => err))
    )
  }
}
