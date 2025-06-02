import { Component, OnInit, OnDestroy } from '@angular/core';
import { SupabaseService } from 'src/app/supabase.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-chat',
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit, OnDestroy {
  messages: any[] = [];
  newMessage = '';
  userId = '';
  username = '';
  subscription: any;

  constructor(private supabase: SupabaseService) {}

  async ngOnInit() {
    const userData = await this.supabase.getUser();
    this.userId = userData.data.user?.id || '';
    this.username = userData.data.user?.email || ''; // ← Aquí extraemos el username

    console.log('User ID:', this.userId);
    console.log('Username:', this.username);

    const { data, error } = await this.supabase.getMessages();
    if (!error && data) {
      this.messages = data;
    } else {
      console.error('Error cargando mensajes:', error);
    }

    this.subscription = this.supabase.onNewMessage((payload) => {
      this.messages.push(payload.new);
    });
  }

  async send() {
    if (!this.newMessage.trim()) return;

    const { data, error } = await this.supabase.sendMessage(this.newMessage, this.userId, this.username);

    if (error) {
      console.error('Error enviando mensaje:', error);
      return;
    }

    if (data && Array.isArray(data) && data[0]) {
      this.messages.push(data[0]); // ← Agrega el mensaje para que se muestre
      this.newMessage = '';        // ← Limpia el campo de entrada
    } else {
      console.warn('No se recibió dato después de insertar mensaje:', data);
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
