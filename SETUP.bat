@echo off
echo ========================================
echo Kochi Metro Rail Document Intelligence
echo ========================================
echo.

cd /d "%~dp0"

echo Step 1: Creating .env file from template...
if not exist "backend\.env" (
    copy "backend\.env.example" "backend\.env"
    echo Created backend\.env file
    echo IMPORTANT: Edit backend\.env to set INITIAL_ADMIN_USERNAME and INITIAL_ADMIN_PASSWORD
    echo.
) else (
    echo .env file already exists
    echo.
)

echo Step 2: Installing backend dependencies...
cd backend
pip install -r requirements.txt
cd ..

echo.
echo Step 3: Installing frontend dependencies...
cd frontend
npm install
cd ..

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Edit backend\.env and set your admin credentials
echo 2. Run START-APP.bat to launch the application
echo.
echo IMPORTANT: Admin credentials set in .env will NOT be shown in the login UI
echo.
pause
