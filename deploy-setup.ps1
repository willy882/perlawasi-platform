# Script de configuración para despliegue en Vercel
# Perlawasi Platform

Write-Host "==================================" -ForegroundColor Cyan
Write-Host "  Perlawasi - Setup de Despliegue" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

# Paso 1: Solicitar URL del repositorio de GitHub
Write-Host "Paso 1: Configurar repositorio remoto" -ForegroundColor Yellow
Write-Host ""
Write-Host "Primero, crea un repositorio en GitHub:" -ForegroundColor White
Write-Host "  1. Ve a: https://github.com/new" -ForegroundColor Gray
Write-Host "  2. Nombre sugerido: perlawasi-platform" -ForegroundColor Gray
Write-Host "  3. NO agregues README, .gitignore, ni license" -ForegroundColor Gray
Write-Host "  4. Haz clic en 'Create repository'" -ForegroundColor Gray
Write-Host ""

$repoUrl = Read-Host "Pega aquí la URL de tu repositorio (ej: https://github.com/willy882/perlawasi-platform.git)"

if ([string]::IsNullOrWhiteSpace($repoUrl)) {
    Write-Host "Error: Debes proporcionar una URL válida" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Agregando repositorio remoto..." -ForegroundColor Green

try {
    git remote add origin $repoUrl
    Write-Host "✓ Repositorio remoto agregado exitosamente" -ForegroundColor Green
} catch {
    Write-Host "! El remoto 'origin' ya existe. Actualizando URL..." -ForegroundColor Yellow
    git remote set-url origin $repoUrl
    Write-Host "✓ URL del repositorio actualizada" -ForegroundColor Green
}

Write-Host ""
Write-Host "Verificando configuración..." -ForegroundColor Yellow
git remote -v

Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "Paso 2: Subir código a GitHub" -ForegroundColor Yellow
Write-Host "==================================" -ForegroundColor Cyan
Write-Host ""

$confirm = Read-Host "¿Deseas subir el código a GitHub ahora? (s/n)"

if ($confirm -eq "s" -or $confirm -eq "S" -or $confirm -eq "si" -or $confirm -eq "SI") {
    Write-Host ""
    Write-Host "Subiendo código a GitHub..." -ForegroundColor Green
    
    try {
        git push -u origin master
        Write-Host ""
        Write-Host "✓✓✓ ¡Código subido exitosamente a GitHub! ✓✓✓" -ForegroundColor Green
        Write-Host ""
        Write-Host "==================================" -ForegroundColor Cyan
        Write-Host "Siguiente paso: Desplegar en Vercel" -ForegroundColor Yellow
        Write-Host "==================================" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "1. Ve a: https://vercel.com/new" -ForegroundColor White
        Write-Host "2. Inicia sesión con GitHub (willyf094@gmail.com)" -ForegroundColor White
        Write-Host "3. Importa el repositorio 'perlawasi-platform'" -ForegroundColor White
        Write-Host "4. Configura las variables de entorno (ver .env.example)" -ForegroundColor White
        Write-Host "5. Haz clic en 'Deploy'" -ForegroundColor White
        Write-Host ""
        Write-Host "Para más detalles, revisa: vercel-deployment-guide.md" -ForegroundColor Cyan
        Write-Host ""
    } catch {
        Write-Host ""
        Write-Host "Error al subir el código:" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
        Write-Host ""
        Write-Host "Posibles soluciones:" -ForegroundColor Yellow
        Write-Host "  1. Verifica que la URL del repositorio sea correcta" -ForegroundColor Gray
        Write-Host "  2. Asegúrate de tener permisos en el repositorio" -ForegroundColor Gray
        Write-Host "  3. Si GitHub pide autenticación, necesitarás un Personal Access Token" -ForegroundColor Gray
        Write-Host "     Ve a: https://github.com/settings/tokens" -ForegroundColor Gray
    }
} else {
    Write-Host ""
    Write-Host "OK. Cuando estés listo, ejecuta:" -ForegroundColor Yellow
    Write-Host "  git push -u origin master" -ForegroundColor Cyan
    Write-Host ""
}

Write-Host ""
Write-Host "Script completado." -ForegroundColor Green
