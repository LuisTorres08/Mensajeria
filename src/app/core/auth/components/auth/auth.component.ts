import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { AuthService } from '../../services/auth.service';
import { SESSION } from '../../../../share/constants/session.constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    NzInputModule,
    FormsModule,
    NzIconModule,
    NzButtonModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  passwordVisible = false;
  password: string = '';
  email: string = '';

  constructor(private _authService: AuthService, private router: Router) {}

  login() {
    const payload = {
      email: this.email,
      password: this.password
    }
    this._authService.login(payload).subscribe((session) => {
      localStorage.setItem(SESSION.localStorage, JSON.stringify(session));
      this.router.navigate(['/contactos']);
    })
  }

}
