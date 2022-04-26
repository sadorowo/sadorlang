@echo off

where node >nul 2>nul && (
    node ./source/menu.js %*
) || (
    echo [error]: nodejs not installed
)