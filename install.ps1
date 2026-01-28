# Script de Instalación Automática - Perlawasi Platform
# Este script instala todas las dependencias necesarias

Write-Host "========================================" -ForegroundColor Green
Write-Host "  Perlawasi Platform - Instalación" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Actualizar PATH
Write-Host "1. Actualizando PATH..." -ForegroundColor Yellow
$env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")

# Verificar Node.js
Write-Host "2. Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = & node --version
    Write-Host "   Node.js instalado: $nodeVersion" -ForegroundColor Green
}
catch {
    Write-Host "   ERROR: Node.js no esta instalado" -ForegroundColor Red
    Write-Host "   Por favor, descarga Node.js desde: https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Verificar npm
Write-Host "3. Verificando npm..." -ForegroundColor Yellow
try {
    $npmVersion = & npm --version
    Write-Host "   npm instalado: $npmVersion" -ForegroundColor Green
}
catch {
    Write-Host "   ERROR: npm no esta disponible" -ForegroundColor Red
    exit 1
}

# Instalar dependencias
Write-Host ""
Write-Host "4. Instalando dependencias del proyecto..." -ForegroundColor Yellow
Write-Host "   (Esto puede tomar 5-10 minutos)" -ForegroundColor Cyan
Write-Host ""

npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  Instalacion completada con exito" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Próximos pasos:" -ForegroundColor Yellow
    Write-Host "1. Configura tu archivo .env.local con las credenciales de Supabase" -ForegroundColor White
    Write-Host "2. Ejecuta: npm run db:push" -ForegroundColor Cyan
    Write-Host "3. Ejecuta: npm run db:seed" -ForegroundColor Cyan
    Write-Host "4. Ejecuta: npm run dev" -ForegroundColor Cyan
    Write-Host ""
}
else {
    Write-Host ""
    Write-Host "Error durante la instalacion" -ForegroundColor Red
    Write-Host "Por favor, revisa los errores arriba" -ForegroundColor Red
    exit 1
}
