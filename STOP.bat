@echo off
setlocal
chcp 65001 >nul
title ROKIKA SHOP - Stop All Services

echo ========================================
echo       ROKIKA SHOP - Stopping Services
echo ========================================
echo.

echo Stopping backend and frontends...
taskkill /FI "WINDOWTITLE eq ROKIKA SHOP - *" /F >nul 2>&1

echo.
echo All ROKIKA SHOP services have been stopped.
echo.
pause
endlocal