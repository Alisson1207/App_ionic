# Subir archivos a Supabase
Esta aplicación permite seleccionar un archivo desde el dispositivo, subirlo a un bucket público de Supabase Storage, y obtener un enlace público para acceder al archivo.
1. Crear el proyecto en Ionic
Se generó un nuevo proyecto básico utilizando la plantilla en blanco de Ionic Angular.
**ionic start App_ionic blank --type=angular**

![image](https://github.com/user-attachments/assets/beb71005-1fbb-4b30-a40f-5e5427043d42)

2. En supabase crear un nuevo proyecto

![image](https://github.com/user-attachments/assets/fe8f9fb5-a1b5-4cc5-b2c4-c5802b371cc3)

## Crear bucket en Supabase Storage
Se creó un bucket llamado archivos.
El bucket se configuró con acceso público para permitir la descarga sin autenticación.

![image](https://github.com/user-attachments/assets/570ec543-a518-4415-b0d2-0539022123ed)

## Configuración de seguridad en Supabase (SQL)

Para que la subida funcione correctamente, fue necesario habilitar políticas de seguridad ya que Supabase usa Row Level Security (RLS) por defecto. A pesar de que el bucket es público, RLS bloquea la inserción de archivos si no hay una política explícita.

![image](https://github.com/user-attachments/assets/cef60a63-840f-4925-8687-e2196503d5fb)

![image](https://github.com/user-attachments/assets/2d4c11e5-0214-458d-a350-977a5f61fa38)

## Integrar Supabase
Se configuró con la URL del proyecto y la clave pública 

## Interfaz Principal

El usuario elige un archivo desde su computador.

![image](https://github.com/user-attachments/assets/b71319b0-2628-4eec-b767-3c044d1839bf)

![image](https://github.com/user-attachments/assets/d7862048-a37a-433f-9e38-748ee675c8e1)

Al pulsar el botón "Subir", la app envía el archivo a Supabase Storage.

La app muestra un mensaje mientras sube el archivo y luego confirma si fue exitoso o si hubo un error.

![image](https://github.com/user-attachments/assets/236a52c3-fbef-4901-ab9e-b30e9041439d)

Al ingresar a Supabase Storage se observa que el archivo se ha subido correctamente

![image](https://github.com/user-attachments/assets/a19d2636-d693-4fc7-b38a-c06cad51e45f)

* Integrante: Alisson Viteri





