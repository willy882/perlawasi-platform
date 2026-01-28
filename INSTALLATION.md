# Guía de Instalación - Perlawasi Platform

Esta guía te ayudará a configurar el proyecto paso a paso.

## ⚠️ Requisito Previo: Instalar Node.js

Antes de comenzar, **DEBES instalar Node.js** en tu computadora.

### Instalación de Node.js en Windows

1. **Descargar Node.js**
   - Ve a: https://nodejs.org/
   - Descarga la versión **LTS** (Long Term Support) - recomendada
   - Archivo: `node-v20.x.x-x64.msi` (aproximadamente 30 MB)

2. **Instalar Node.js**
   - Ejecuta el archivo descargado
   - Sigue el asistente de instalación
   - **IMPORTANTE**: Marca la opción "Automatically install the necessary tools"
   - Haz clic en "Next" hasta completar la instalación

3. **Verificar la Instalación**
   - Abre PowerShell (busca "PowerShell" en el menú de Windows)
   - Ejecuta estos comandos:
   ```powershell
   node --version
   # Debería mostrar: v20.x.x
   
   npm --version
   # Debería mostrar: 10.x.x
   ```

   Si ves los números de versión, ¡Node.js está instalado correctamente! ✅

## 📦 Paso 1: Instalar Dependencias del Proyecto

Una vez que Node.js esté instalado:

```powershell
# Navega a la carpeta del proyecto
cd d:\DATOS\perlatodo\perlawasi-platform

# Instala todas las dependencias
npm install
```

Este proceso puede tomar 5-10 minutos dependiendo de tu conexión a internet.

## 🗄️ Paso 2: Configurar Supabase

1. **Crear Proyecto en Supabase**
   - Ve a: https://supabase.com
   - Inicia sesión o crea una cuenta
   - Haz clic en "New Project"
   - Completa los datos:
     - Name: `perlawasi`
     - Database Password: (guarda esta contraseña, la necesitarás)
     - Region: `South America (São Paulo)` (más cercano a Perú)
   - Haz clic en "Create new project"
   - Espera 2-3 minutos mientras se crea el proyecto

2. **Obtener las Credenciales**
   
   Una vez creado el proyecto:
   
   - Ve a **Settings** (⚙️) → **Database**
   - Copia el **Connection String** (URI)
   - Reemplaza `[YOUR-PASSWORD]` con la contraseña que creaste
   
   - Ve a **Settings** (⚙️) → **API**
   - Copia:
     - `Project URL`
     - `anon public` key

3. **Configurar Variables de Entorno**
   
   ```powershell
   # Copia el archivo de ejemplo
   copy .env.example .env.local
   ```
   
   Abre `.env.local` con un editor de texto y completa:
   
   ```env
   # Pega tu Connection String aquí
   DATABASE_URL="postgresql://postgres:TU_PASSWORD@db.xxx.supabase.co:5432/postgres"
   DIRECT_URL="postgresql://postgres:TU_PASSWORD@db.xxx.supabase.co:5432/postgres"
   
   # Pega tu Project URL aquí
   NEXT_PUBLIC_SUPABASE_URL="https://xxx.supabase.co"
   
   # Pega tu anon key aquí
   NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGc..."
   
   # Genera un secret aleatorio (puedes usar cualquier texto largo y aleatorio)
   NEXTAUTH_SECRET="tu-secret-super-aleatorio-aqui-cambialo"
   ```

## 💳 Paso 3: Configurar Mercado Pago (Opcional para desarrollo)

1. **Crear Cuenta de Desarrollador**
   - Ve a: https://www.mercadopago.com.pe/developers
   - Inicia sesión o crea una cuenta
   - Ve a **Tus aplicaciones** → **Crear aplicación**
   - Nombre: `Perlawasi`
   - Selecciona: **Pagos online**

2. **Obtener Credenciales de Prueba**
   - En tu aplicación, ve a **Credenciales**
   - Copia las **Credenciales de prueba**:
     - `Public Key`
     - `Access Token`

3. **Agregar a .env.local**
   ```env
   MERCADOPAGO_ACCESS_TOKEN="TEST-tu-access-token-aqui"
   NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY="TEST-tu-public-key-aqui"
   ```

## 🗃️ Paso 4: Crear la Base de Datos

```powershell
# Crear las tablas en Supabase
npx prisma db push

# Poblar con datos de ejemplo
npm run db:seed
```

Si todo sale bien, verás:
```
✅ Admin user created: admin@perlawasi.com
✅ Categories created
✅ Sample products created
🎉 Database seeded successfully!
```

**Credenciales de Admin:**
- Email: `admin@perlawasi.com`
- Password: `admin123`

## 🚀 Paso 5: Ejecutar el Proyecto

```powershell
npm run dev
```

Verás algo como:
```
  ▲ Next.js 14.2.0
  - Local:        http://localhost:3000
  - Ready in 2.5s
```

Abre tu navegador y ve a: **http://localhost:3000**

¡Deberías ver la página principal de Perlawasi! 🎉

## 🔧 Comandos Útiles

```powershell
# Ejecutar en modo desarrollo
npm run dev

# Ver la base de datos con Prisma Studio
npm run db:studio

# Verificar errores de TypeScript
npm run type-check

# Verificar código con ESLint
npm run lint

# Construir para producción
npm run build

# Ejecutar versión de producción
npm start
```

## 🌐 Compartir Vista Previa

### Opción 1: Compartir en Red Local

Si estás en la misma red WiFi que tus colaboradores:

1. Encuentra tu IP local:
   ```powershell
   ipconfig
   # Busca "Dirección IPv4": 192.168.x.x
   ```

2. Comparte la URL:
   ```
   http://192.168.x.x:3000
   ```

### Opción 2: Desplegar en Vercel (Recomendado)

1. **Instalar Vercel CLI**
   ```powershell
   npm i -g vercel
   ```

2. **Desplegar**
   ```powershell
   vercel
   ```

3. **Seguir las instrucciones:**
   - Login con GitHub, GitLab o Email
   - Confirmar configuración
   - Esperar el despliegue

4. **Obtener URL de Vista Previa**
   ```
   https://perlawasi-platform-xxx.vercel.app
   ```

Esta URL puedes compartirla con cualquier persona en el mundo.

## ❓ Problemas Comunes

### Error: "npx no se reconoce"
- **Solución**: Node.js no está instalado. Ve al Paso 1 de esta guía.

### Error: "Cannot find module '@prisma/client'"
- **Solución**: 
  ```powershell
  npm install
  npx prisma generate
  ```

### Error: "Invalid DATABASE_URL"
- **Solución**: Verifica que copiaste correctamente la URL de Supabase en `.env.local`

### Error: "Port 3000 is already in use"
- **Solución**: Otro programa está usando el puerto 3000
  ```powershell
  # Usar otro puerto
  npm run dev -- -p 3001
  ```

### La página se ve sin estilos
- **Solución**: 
  ```powershell
  # Detén el servidor (Ctrl+C)
  # Elimina la carpeta .next
  Remove-Item -Recurse -Force .next
  # Vuelve a ejecutar
  npm run dev
  ```

## 📞 Soporte

Si tienes problemas:
1. Revisa esta guía nuevamente
2. Verifica que Node.js esté instalado correctamente
3. Asegúrate de que todas las variables de entorno estén configuradas
4. Revisa los mensajes de error en la consola

## 🎯 Próximos Pasos

Una vez que el proyecto esté funcionando:

1. **Personalizar Contenido**
   - Agrega tus propias imágenes
   - Modifica textos y descripciones
   - Agrega productos reales

2. **Configurar Producción**
   - Usa credenciales reales de Mercado Pago
   - Configura dominio personalizado
   - Habilita HTTPS

3. **Agregar Funcionalidades**
   - Implementar más páginas
   - Agregar más categorías de productos
   - Personalizar el chatbot

¡Éxito con tu proyecto Perlawasi! 🚀
