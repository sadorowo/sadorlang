@echo off

where node>nul
if %errorlevel% == 1 (
    echo [error]: nodejs not installed
) else (
    node ./ui/menu.js %*
)