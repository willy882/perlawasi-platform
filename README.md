# Perlawasi Platform

Plataforma completa de e-commerce y reservaciones para Perlawasi - Restaurante, Heladería, Cafetería, Chocolates, Ropa, Alojamiento, Cerveza, Plantas y Licorería.

## 🚀 Características

- ✅ Next.js 14+ con TypeScript
- ✅ Supabase (PostgreSQL) + Prisma ORM
- ✅ NextAuth.js para autenticación
- ✅ Integración con Mercado Pago
- ✅ Carrito de compras
- ✅ Sistema de reservaciones
- ✅ Panel de administración
- ✅ Chatbot inteligente
- ✅ Integración WhatsApp
- ✅ Soporte multiidioma (i18n)
- ✅ Diseño responsive y premium
- ✅ Seguridad robusta

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** 18.17 o superior
- **npm** o **yarn**
- Cuenta en **Supabase**
- Cuenta de desarrollador en **Mercado Pago**

## 🛠️ Instalación

### 1. Instalar Node.js

Si no tienes Node.js instalado, descárgalo desde:
- **Sitio oficial**: https://nodejs.org/ (recomendado: versión LTS)
- **Verificar instalación**: Abre PowerShell y ejecuta:
  ```powershell
  node --version
  npm --version
  ```

### 2. Instalar Dependencias

```bash
cd perlawasi-platform
npm install
```

### 3. Configurar Variables de Entorno

Copia el archivo `.env.example` a `.env.local`:

```bash
copy .env.example .env.local
```

Edita `.env.local` con tus credenciales:

```env
# Supabase
DATABASE_URL="postgresql://user:password@host:port/database"
NEXT_PUBLIC_SUPABASE_URL="tu-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="tu-supabase-anon-key"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="genera-un-secret-aleatorio"

# Mercado Pago
MERCADOPAGO_ACCESS_TOKEN="tu-access-token"
NEXT_PUBLIC_MERCADOPAGO_PUBLIC_KEY="tu-public-key"

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER="928141669"
```

### 4. Configurar Base de Datos

```bash
# Crear las tablas en Supabase
npm run db:push

# O usar migraciones
npm run db:migrate

# Poblar con datos de ejemplo
npm run db:seed
```

### 5. Ejecutar en Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 📁 Estructura del Proyecto

```
perlawasi-platform/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── (main)/            # Rutas públicas
│   │   │   ├── page.tsx       # Homepage
│   │   │   ├── [category]/    # Páginas de categorías
│   │   │   ├── product/       # Detalles de productos
│   │   │   ├── cart/          # Carrito de compras
│   │   │   └── checkout/      # Proceso de pago
│   │   ├── admin/             # Panel de administración
│   │   ├── api/               # API Routes
│   │   └── layout.tsx         # Layout principal
│   ├── components/            # Componentes reutilizables
│   ├── lib/                   # Utilidades y configuraciones
│   └── styles/                # Estilos globales
├── prisma/
│   ├── schema.prisma          # Esquema de base de datos
│   └── seed.ts                # Datos de ejemplo
├── public/                    # Archivos estáticos
└── .env.local                 # Variables de entorno (no incluir en git)
```

## 🎨 Categorías de Productos

1. **Restaurante** - Menú y experiencias gastronómicas
2. **Heladería** - Sabores artesanales
3. **Cafetería** - Café de especialidad
4. **Chocolates** - Chocolatería fina
5. **Ropa** - Boutique artesanal
6. **Alojamiento** - Reservas de habitaciones
7. **Cerveza** - Cervecería artesanal
8. **Plantas** - Vivero y decoración
9. **Licorería** - Destilados premium

## 🔐 Seguridad

- Rate limiting en todas las rutas API
- Validación de datos con Zod
- Sanitización de inputs
- Protección CSRF
- Sesiones seguras
- Encriptación de contraseñas
- 2FA opcional

## 🌐 Despliegue

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

### Compartir Vista Previa

Después de desplegar en Vercel, obtendrás una URL de vista previa que puedes compartir:
```
https://perlawasi-platform-xxx.vercel.app
```

## 📞 Soporte

- **Ubicación**: Segunda Jerusalén - Rioja, San Martín
- **WhatsApp**: +51 928 141 669
- **Operadores Turísticos**: +60 alianzas

## 📄 Licencia

Proyecto privado - Perlawasi © 2026
