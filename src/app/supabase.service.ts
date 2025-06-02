import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = '';
const SUPABASE_ANON_KEY = '';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  // Registro
  async signUp(email: string, password: string) {
    return await this.supabase.auth.signUp({ email, password });
  }

  // Login
  async signIn(email: string, password: string) {
    return await this.supabase.auth.signInWithPassword({ email, password });
  }

  // Logout
  async signOut() {
    return await this.supabase.auth.signOut();
  }

  // Obtener usuario actual
  getUser() {
    return this.supabase.auth.getUser();
  }

  // Escuchar cambios de sesión
  onAuthStateChange(callback: (event: string, session: any) => void) {
    return this.supabase.auth.onAuthStateChange(callback);
  }

  // Obtener mensajes
  async getMessages() {
    return this.supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: true });
  }

  // Enviar mensaje con username
  // Enviar mensaje
async sendMessage(content: string, userId: string, username: string) {
  return this.supabase
    .from('messages')
    .insert([{ content, user_id: userId, username }])
    .select(); // <- Esto hace que devuelva el mensaje insertado
}


  // Suscribirse a nuevos mensajes en tiempo real
  onNewMessage(callback: (payload: any) => void) {
    return this.supabase
      .channel('messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        (payload) => {
          callback(payload);
        }
      )
      .subscribe();
  }
}
