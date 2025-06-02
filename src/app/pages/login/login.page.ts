import { Component } from '@angular/core';
import { SupabaseService  } from 'src/app/supabase.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email = '';
  password = '';
  error = '';

  constructor(private supabase: SupabaseService , private router: Router) {}

  async login() {
    const { data, error } = await this.supabase.signIn(this.email, this.password);
    if (error) {
      this.error = error.message;
    } else {
      this.router.navigate(['/chat']);
    }
  }

  async signUp() {
    const { data, error } = await this.supabase.signUp(this.email, this.password);
    if (error) {
      this.error = error.message;
    } else {
      this.error = 'Revisa tu correo para confirmar la cuenta';
    }
  }
}

