# ROKIKA SHOP - Local Testing Guide

## Quick Start (Easiest)

### Option 1: One-Click Startup (Windows)

Double-click **`START_HERE.bat`** at the root of the project.

This script will:
1. Check Python and Node.js are installed
2. Create Python virtual environment (if needed)
3. Install backend dependencies
4. Install frontend dependencies
5. Start backend API on http://localhost:8000
6. Start storefront on http://localhost:3000
7. Start dashboard on http://localhost:3002

### Stop All Services

Double-click **`STOP.bat`** to stop all running services.

---

## Manual Startup (If you prefer control)

### 1. Backend API
```bash
cd Backend_API
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
Access: http://localhost:8000/docs (API docs)

### 2. Storefront (Frontend_User)
```bash
cd Frontend_User
npm install
npm start
```
Access: http://localhost:3000

### 3. Dashboard (Frontend_Dashboard_User)
```bash
cd Frontend_Dashboard_User
npm install
npm start
```
Access: http://localhost:3002

---

## Default Accounts

| Role | Username | Password | URL |
|------|----------|----------|-----|
| Platform Admin | `admin` | `ChangeMe123!` | http://localhost:3001 |
| Shop Owner (demo) | `demo` | `demo123` | http://localhost:3002 |
| Reseller | `reseller` | `reseller123` | http://localhost:3005 |

---

## Important Notes

1. **First run** will take a few minutes to install dependencies
2. **Database** is SQLite by default (stored in `Backend_API/data/minishop.db`)
3. **No internet required** after dependencies are installed
4. **No real money** is used - all payments are in sandbox mode
5. **Change default passwords** before any real use

---

## Troubleshooting

### Port already in use
If port 3000, 3002, or 8000 is already taken:
- Backend: `uvicorn main:app --reload --port 8001`
- Storefront: `set PORT=3001 && npm start`
- Dashboard: `set PORT=3003 && npm start`

### Python venv activation fails
Run PowerShell as Administrator and execute:
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### npm install fails
Clear cache and retry:
```bash
npm cache clean --force
npm install
```

---

## Project Structure

```
MiniShopCambodia-FullStackWeb-main/
├── START_HERE.bat          ← Double-click this to start everything
├── STOP.bat                ← Double-click this to stop everything
├── Backend_API/            ← FastAPI backend (port 8000)
│   ├── main.py
│   ├── requirements.txt
│   ├── .env.example
│   ├── render.yaml
│   └── data/               ← SQLite database (auto-created)
├── Frontend_User/          ← Customer storefront (port 3000)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── netlify.toml
├── Frontend_Dashboard_User/ ← Shop owner dashboard (port 3002)
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── netlify.toml
├── Frontend_Admin/          ← Platform admin panel (port 3001)
├── Frontend_Reseller/       ← Reseller dashboard (port 3005)
├── Frontend_Telegram_Mini_APP/ ← Telegram Mini App (port 3006)
└── README.md
```

---

## What You Can Do Locally

1. **Create a shop** - http://localhost:3000/create-shop (Starter plan is FREE)
2. **Browse demo shop** - http://localhost:3000/demo
3. **Manage products** - http://localhost:3002 (login as `demo` / `demo123`)
4. **Test checkout** - Add products to cart and pay with ABA (sandbox)
5. **View reports** - Dashboard has sales charts and statistics
6. **Test POS** - Create in-store orders with cash or KHQR payment
7. **Manage customers** - Add customers with passwords for login

---

## Need Help?

- Full documentation: See `README.md`
- API docs: http://localhost:8000/docs
- Issues: Check the troubleshooting section above
