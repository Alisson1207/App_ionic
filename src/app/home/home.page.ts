import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { supabase } from '../supabase.client';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  selectedFile: File | null = null;
  uploadStatus = '';
  uploadedUrl: string | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async uploadFile() {
    if (!this.selectedFile) {
      this.uploadStatus = 'Selecciona un archivo primero.';
      return;
    }

    this.uploadStatus = 'Subiendo archivo...';

    try {
      const { data, error } = await supabase.storage
        .from('archivos') // 
        .upload(`archivos/${this.selectedFile.name}`, this.selectedFile, {
          cacheControl: '3600',
          upsert: false,
        });

      if (error) throw error;

      const { data: publicUrl } = supabase.storage
        .from('nombre-del-bucket')
        .getPublicUrl(`archivos/${this.selectedFile.name}`);

      this.uploadedUrl = publicUrl.publicUrl;
      this.uploadStatus = 'Archivo subido correctamente.';
    } catch (error: any) {
      this.uploadStatus = 'Error al subir: ' + error.message;
    }
  }
}
