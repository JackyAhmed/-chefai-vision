@echo off
title Cooking Assistant
color 0A

echo ============================================
echo   🍳 Cooking Assistant - Starting Up
echo ============================================
echo.

REM Check Node.js
node --version >nul 2>&1
IF %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js not found. Download from https://nodejs.org
    pause
    exit /b 1
)

REM Check if .env exists for backend
IF NOT EXIST "backend\.env" (
    echo [SETUP] Creating backend\.env from example...
    copy "backend\.env.example" "backend\.env"
    echo.
    echo  *** IMPORTANT ***
    echo  Open backend\.env and add your OPENAI_API_KEY before continuing.
    echo  Press any key after you have edited the file.
    pause
)

REM Install backend deps if needed
IF NOT EXIST "backend\node_modules" (
    echo [SETUP] Installing backend dependencies...
    cd backend && npm install && cd ..
)

REM Install frontend deps if needed
IF NOT EXIST "frontend\node_modules" (
    echo [SETUP] Installing frontend dependencies...
    cd frontend && npm install && cd ..
)

REM Build frontend if not built
IF NOT EXIST "frontend\dist\index.html" (
    echo [BUILD] Building frontend...
    cd frontend && npm run build && cd ..
)

echo.
echo [START] Launching backend on http://localhost:3001
echo        Open your browser to: http://localhost:3001
echo        Press Ctrl+C to stop.
echo.

cd backend && node server.js
