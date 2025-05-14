#Сама структура схематично лежит рядом в .txt
# Путь к корневой папке проекта
$projectRoot = Join-Path $PWD "project"

# Создаем основную папку проекта
New-Item -ItemType Directory -Force -Path $projectRoot | Out-Null

# Переходим в нее
Set-Location $projectRoot

# --- CLIENT ---

$clientDir = Join-Path $projectRoot "client"
New-Item -ItemType Directory -Force -Path $clientDir | Out-Null

# client/public
New-Item -ItemType Directory -Force -Path (Join-Path $clientDir "public") | Out-Null

# client/src
$srcDir = Join-Path $clientDir "src"
New-Item -ItemType Directory -Force -Path $srcDir | Out-Null

# client/src/assets
New-Item -ItemType Directory -Force -Path (Join-Path $srcDir "assets") | Out-Null

# client/src/components
New-Item -ItemType Directory -Force -Path (Join-Path $srcDir "components") | Out-Null

# client/src/contexts
New-Item -ItemType Directory -Force -Path (Join-Path $srcDir "contexts") | Out-Null

# client/src/hooks
New-Item -ItemType Directory -Force -Path (Join-Path $srcDir "hooks") | Out-Null

# client/src/pages
$pagesDir = Join-Path $srcDir "pages"
New-Item -ItemType Directory -Force -Path $pagesDir | Out-Null

# client/src/pages/Auth
$authDir = Join-Path $pagesDir "Auth"
New-Item -ItemType Directory -Force -Path $authDir | Out-Null

# client/src/pages/Auth/Login.tsx + styles.css
New-Item -ItemType File -Force -Path (Join-Path $authDir "Login.tsx") -Value "// Login Page Component" | Out-Null
New-Item -ItemType File -Force -Path (Join-Path $authDir "styles.css") -Value "/* Auth page styles */" | Out-Null

# client/src/pages/Home
New-Item -ItemType Directory -Force -Path (Join-Path $pagesDir "Home") | Out-Null

# client/src/styles
$stylesDir = Join-Path $srcDir "styles"
New-Item -ItemType Directory -Force -Path $stylesDir | Out-Null

# client/src/styles/globals.css
New-Item -ItemType File -Force -Path (Join-Path $stylesDir "globals.css") -Value "/* Global Styles */" | Out-Null

# client/src/styles/themes
New-Item -ItemType Directory -Force -Path (Join-Path $stylesDir "themes") | Out-Null

# client/src/App.tsx
New-Item -ItemType File -Force -Path (Join-Path $srcDir "App.tsx") -Value "function App() { return <div>Hello</div>; } export default App;" | Out-Null

# client/src/main.tsx
New-Item -ItemType File -Force -Path (Join-Path $srcDir "main.tsx") -Value "import React from 'react'; import ReactDOM from 'react-dom/client'; import App from './App'; ReactDOM.createRoot(document.getElementById('root')!).render(<App />);" | Out-Null

# client/src/vite-env.d.ts
New-Item -ItemType File -Force -Path (Join-Path $srcDir "vite-env.d.ts") -Value "/// <reference types=\"vite/client\" />" | Out-Null

# client/tailwind.config.js
New-Item -ItemType File -Force -Path (Join-Path $clientDir "tailwind.config.js") -Value "module.exports = {};" | Out-Null

# client/postcss.config.js
New-Item -ItemType File -Force -Path (Join-Path $clientDir "postcss.config.js") -Value "module.exports = {};" | Out-Null

# client/tsconfig.json
New-Item -ItemType File -Force -Path (Join-Path $clientDir "tsconfig.json") -Value "{}`n" | Out-Null

# --- SERVER ---

$serverDir = Join-Path $projectRoot "server"
New-Item -ItemType Directory -Force -Path $serverDir | Out-Null

# server/config
New-Item -ItemType Directory -Force -Path (Join-Path $serverDir "config") | Out-Null

# server/models
New-Item -ItemType Directory -Force -Path (Join-Path $serverDir "models") | Out-Null

# server/routes
New-Item -ItemType Directory -Force -Path (Join-Path $serverDir "routes") | Out-Null

# server/server.ts
New-Item -ItemType File -Force -Path (Join-Path $serverDir "server.ts") -Value "// Express or Fastify server here" | Out-Null

# --- ROOT FILES ---

# .env
New-Item -ItemType File -Force -Path (Join-Path $projectRoot ".env") -Value "# Environment variables\nPORT=3000" | Out-Null

# README.md
New-Item -ItemType File -Force -Path (Join-Path $projectRoot "README.md") -Value "# My Project" | Out-Null

Write-Host "✅ Структура проекта успешно создана по пути: $projectRoot"