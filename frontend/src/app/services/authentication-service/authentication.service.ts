import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, switchMap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from 'src/app/model/user.interface';


export interface LoginForm {
  email: string;
  password: string;
}

export const JWT_NAME = 'blog-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(loginForm: LoginForm) {

    return this.http.post<any>('/api/users/login', {email: loginForm.email, password: loginForm.password}).pipe(
      map((token) => {
        localStorage.setItem(JWT_NAME, token.access_token);
        return token;
      })
    );
  }

  register(user: User) {
    return this.http.post<any>('/api/users/', user).pipe(
      map(user => user)
    )
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_NAME);
    if(token) {
      return !this.jwtHelper.isTokenExpired(token)
    }
    return false;
  }

  getUserId(): Observable<number>{
    return of(localStorage.getItem(JWT_NAME)).pipe(
      switchMap((jwt: any) => of(this.jwtHelper.decodeToken(jwt)).pipe(
        map((jwt: any) => jwt.user.id)
      )
    ));
  }
}
