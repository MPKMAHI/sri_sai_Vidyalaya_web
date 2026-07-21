# PowerShell Script to Download School Website Images from Unsplash

$imagesDir = Join-Path $PSScriptRoot "images"
if (!(Test-Path $imagesDir)) {
    New-Item -ItemType Directory -Force -Path $imagesDir | Out-Null
}

$images = @{
    "hero.jpg"      = "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=1200&q=80"
    "school.jpg"    = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80"
    "classroom.jpg" = "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80"
    "library.jpg"   = "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80"
    "lab.jpg"       = "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80"
    "sports.jpg"    = "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?auto=format&fit=crop&w=800&q=80"
    "principal.jpg" = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
    "teacher1.jpg"  = "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80"
    "teacher2.jpg"  = "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
    "teacher3.jpg"  = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
    "teacher4.jpg"  = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
    "teacher5.jpg"  = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
    "teacher6.jpg"  = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
    "teacher7.jpg"  = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80"
    "teacher8.jpg"  = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80"
}

Write-Host "Starting images download..."
foreach ($filename in $images.Keys) {
    $dest = Join-Path $imagesDir $filename
    $url = $images[$filename]
    Write-Host "Downloading $filename from $url ..."
    try {
        Invoke-WebRequest -Uri $url -OutFile $dest -TimeoutSec 15
        Write-Host "Successfully downloaded $filename."
    } catch {
        Write-Error "Failed to download $filename. Error: $_"
    }
}
Write-Host "Download process finished."
