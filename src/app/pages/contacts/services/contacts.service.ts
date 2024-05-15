import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ENDPOINTS } from '../../../share/constants/endpoints.constant';
import { Contacts } from '../interface/person.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contacts[]> {
    return this.http.get<Contacts[]>(`${ENDPOINTS.api}/contacts`)
  }
}
