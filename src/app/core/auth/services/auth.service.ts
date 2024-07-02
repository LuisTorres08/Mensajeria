import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENDPOINTS } from '../../../share/constants/endpoints.constant';
import { User, UserPayload } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(payload: UserPayload): Observable<User>{
    return this.http.post<User>(`${ENDPOINTS.api}/auth/login`, payload);
  }
}
