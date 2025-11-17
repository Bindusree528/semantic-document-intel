@echo off
echo ========================================
echo Starting Semantic Document Intelligence
echo ========================================
echo.
echo This will start both Backend and Frontend servers
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Opening two terminal windows...
echo.

start cmd /k "%~dp0run-backend.bat"
timeout /t 3 /nobreak >nul
start cmd /k "%~dp0run-frontend.bat"

echo.
echo Both servers are starting in separate windows.
echo Please wait for them to fully start before accessing the application.
echo.
echo Default login credentials:
echo Username: admin
echo Password: admin123
echo.
pause
