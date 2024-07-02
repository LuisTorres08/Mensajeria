import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { Contacts } from './interface/person.interface';
import { ContactsService } from './services/contacts.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [
    NzInputModule,
    FormsModule,
    NzButtonModule,
    NzTableModule,
    NzModalModule,
    NzMessageModule,
    NzPopconfirmModule
  ],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export default class ContactsComponent {
  value: string = '';
  listOfData: Contacts[] = [];
  listOfDataTmp: Contacts[] = [];
  isVisible: boolean = false;

  form!: Contacts;


  constructor(private _contactsServices: ContactsService, private message: NzMessageService) { }

  ngOnInit() {
    this.getContacts();
    this.initForm();
  }

  initForm() {
    this.form = {
      name: '',
      phone: null
    }
  }

  getContacts() {
    this._contactsServices.getContacts().subscribe((contacts: Contacts[]) => {
      this.listOfData = contacts;
      this.listOfDataTmp = contacts;
    })
  }

  search() {
    this.listOfData = this.listOfDataTmp.filter((contact: Contacts) => contact.name.toLowerCase().indexOf(this.value.toLowerCase()) > -1);
  }

  createContacts() {
    this._contactsServices.saveContacts(this.form).subscribe(_ => {
      this.message.success('Contacto guardado');
      this.getContacts();
      this.initForm();
    })
  }

  openModal(): void {
    this.initForm();
    this.isVisible = true;
  }

  deleteContact(_id: string) {
    this._contactsServices.deleteContacts(_id).subscribe(_ => {
      this.message.success('Contacto eliminado');
      this.getContacts();
    })
  }

  update() {
    this._contactsServices.updateContact(this.form).subscribe(_ => {
      this.message.success('Contacto actualizado');
    })
  }

  edit(data: Contacts) {
    this.form = data;
    this.isVisible = true;
  }

  handleOk() {
    if (this.form._id) {
      this.update();
    } else {
      this.createContacts()
    }
    this.isVisible = false;
  }

  handleCancel() {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
