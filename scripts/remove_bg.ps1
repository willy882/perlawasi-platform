Add-Type -AssemblyName System.Drawing

$inputPath = "d:\DATOS\perlatodo\perlawasi-platform\public\images\kawaii-icecream.png"
$outputPath = "d:\DATOS\perlatodo\perlawasi-platform\public\images\kawaii-icecream-transparent.png"
$tolerance = 20 # Tolerancia para el blanco (0-255)

try {
    $img = [System.Drawing.Bitmap]::FromFile($inputPath)
    $newImg = New-Object System.Drawing.Bitmap($img.Width, $img.Height)
    $newImg.SetResolution($img.HorizontalResolution, $img.VerticalResolution)

    # Convertir a transparente
    for ($x = 0; $x -lt $img.Width; $x++) {
        for ($y = 0; $y -lt $img.Height; $y++) {
            $pixel = $img.GetPixel($x, $y)
            
            # Verificar si es blanco o cercano a blanco
            if ($pixel.R -gt (255 - $tolerance) -and 
                $pixel.G -gt (255 - $tolerance) -and 
                $pixel.B -gt (255 - $tolerance)) {
                $newImg.SetPixel($x, $y, [System.Drawing.Color]::Transparent)
            }
            else {
                $newImg.SetPixel($x, $y, $pixel)
            }
        }
    }

    $newImg.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    Write-Host "Success: Image saved to $outputPath"
}
catch {
    Write-Error "Error processing image: $_"
}
finally {
    if ($img) { $img.Dispose() }
    if ($newImg) { $newImg.Dispose() }
}
