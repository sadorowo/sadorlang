function CheckCommand($name) {
    return [bool](Get-Command -Name $name -ErrorAction SilentlyContinue)
}

function CheckPath($name) {
    return [bool](Test-Path -Path $name -PathType Container -ErrorAction SilentlyContinue)
}

function DownloadRepo($scriptPath)
{ 
    [string]$location = Resolve-Path $scriptPath
    [string]$name = "sadorlang"
     
    $file = "$location\$name.zip"
    New-Item $file -ItemType File -Force
 
    $repoUrl = "https://api.github.com/repos/vernehere/sadorlang/zipball/main"
    Write-Progress -Activity "Downloading GitHub repository..." -Status "0% Complete:" -PercentComplete 0
    Invoke-RestMethod -Uri $repoUrl -OutFile $file
    Write-Progress -Activity "Downloading GitHub repository..." -Status "100% Complete:" -PercentComplete 100
 
    Write-Progress -Activity "Unzipping GitHub repository..." -Status "0% Complete:" -PercentComplete 0
    Expand-Archive -Path $file -DestinationPath $location -Force
    Write-Progress -Activity "Unzipping GitHub repository..." -Status "100% Complete:" -PercentComplete 100
     
    Write-Output "$file $location"
    Remove-Item -Path $file -Force

    [string]$dirname = (Get-ChildItem $location *sadorlang* -Recurse -Directory).Name
    $env:Path += ";$scriptPath\$dirname"
}

if (-not (CheckCommand -name 'node') -or -not (CheckCommand -name 'npm')) {
    Write-Output "NodeJS/NPM not installed"
} else {
    [string]$scriptPath = Read-Host "Please give me path where SadorLang should be installed"

    if (-not (CheckPath -name $scriptPath)) {
        Write-Output "Invalid path provided"
    } else { DownloadRepo -scriptPath $scriptPath }
}