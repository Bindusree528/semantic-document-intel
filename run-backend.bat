@echo off
echo ========================================
echo Semantic Document Intelligence Backend
echo ========================================
echo.

cd /d "%~dp0"

echo Checking Python installation...
python --version
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH
    pause
    exit /b 1
)

echo.
echo Installing dependencies...
cd backend
pip install -r requirements.txt

echo.
echo Creating uploaded_files directory...
if not exist "uploaded_files" mkdir uploaded_files

echo.
echo Starting FastAPI server...
echo Backend will be available at: http://localhost:8000
echo API docs available at: http://localhost:8000/docs
echo.
echo Press Ctrl+C to stop the server
echo.

cd ..
python -m backend.main
