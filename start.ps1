# Script de Inicio Rápido - Perlawasi Platform
# Este script ejecuta el servidor de desarrollo

Write-Host "========================================" -ForegroundColor Green
Write-Host "  Perlawasi Platform - Servidor Dev" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""

# Actualizar PATH
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Verificar que node_modules existe
if (-Not (Test-Path "node_modules")) {
    Write-Host "✗ ERROR: Dependencias no instaladas" -ForegroundColor Red
    Write-Host "Por favor, ejecuta primero: .\install.ps1" -ForegroundColor Yellow
    exit 1
}

# Verificar .env.local
if (-Not (Test-Path ".env.local")) {
    Write-Host "⚠ ADVERTENCIA: .env.local no encontrado" -ForegroundColor Yellow
    Write-Host "Creando .env.local desde .env.example..." -ForegroundColor Cyan
    Copy-Item .env.example .env.local
    Write-Host ""
    Write-Host "✓ Archivo .env.local creado" -ForegroundColor Green
    Write-Host "⚠ IMPORTANTE: Debes editar .env.local con tus credenciales de Supabase" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Presiona Enter para abrir .env.local en el editor..." -ForegroundColor Cyan
    Read-Host
    notepad .env.local
    Write-Host ""
    Write-Host "¿Has configurado las credenciales? (S/N)" -ForegroundColor Yellow
    $response = Read-Host
    if ($response -ne "S" -and $response -ne "s") {
        Write-Host "Por favor, configura .env.local antes de continuar" -ForegroundColor Red
        exit 1
    }
}

Write-Host "Iniciando servidor de desarrollo..." -ForegroundColor Green
Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Cyan
Write-Host ""

npm run dev
