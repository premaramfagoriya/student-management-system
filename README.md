# 🎓 Student Management System

A full-stack web application to manage student records with secure authentication.

## 🚀 Tech Stack

* ASP.NET Core Web API
* React.js (Vite)
* SQL Server
* JWT Authentication

## 🔥 Features

* User Login (JWT Authentication)
* Add / Update / Delete Students
* Secure API Endpoints
* Layered Architecture (Controller, Service, Repository)
* Global Exception Handling
* Swagger API Documentation

## 📂 Project Structure

* Backend: ASP.NET Core API
* Frontend: React (Vite)

## ⚙️ Setup Instructions

### Backend

1. Open solution in Visual Studio
2. Update connection string in `appsettings.json`
3. {
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "Sqlconnection": "Server=;Database=;User Id=;Password=;TrustServerCertificate=True;Encrypt=True;",
    "DefaultConnection": "Server=;Database=;User Id=;Password=;TrustServerCertificate=True;Encrypt=True;"


  },


  
    "Jwt": {
      "Key": ""
    }
  
}
4. Run the API

### Frontend

```bash
cd studentmanagement.client
npm install
npm run dev
```

## 🔐 Login Credentials

```
Username: admin
Password: admin123
```

## 📌 Author

Premaram – Full Stack Developer
