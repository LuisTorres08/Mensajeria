import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Contacts } from './interface/person.interface';
import { ContactsService } from './services/contacts.service';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    NzInputModule,
    FormsModule,
    NzButtonModule,
    NzTableModule
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  value: string = '';
  listOfData: Contacts[] = [];

  constructor(private _contactsServices: ContactsService) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this._contactsServices.getContacts().subscribe((contacts: Contacts[]) => {
      this.listOfData = contacts;
    })
  }

}
