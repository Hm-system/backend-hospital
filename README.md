# Hospital Management System Backend

**Microservices backend for comprehensive hospital operations.**

## 🎯 Overview

A modular backend system that streamlines hospital workflows including patient management, appointment scheduling, medical records, staff coordination, inventory tracking, and billing processes. Designed with microservices architecture to ensure each hospital department can scale independently.

## 🏗️ Tech Stack

- **NestJS** - Microservices framework
- **MongoDB** - Document database
- **Firebase** - Authentication & cloud storage
- **Redis** - Caching & session management
- **Swagger** - Interactive API documentation
- **Postman** - API testing suite

## 🚀 Getting Started
```bash
# Clone repository
git clone https://github.com/horlami228/hospital-management-backend.git

# Install dependencies
yarn install

# Setup environment
cp .env.example .env

# Launch Redis server
redis-server

# Start microservices
yarn start:dev
```

## 📚 API Documentation

- **Swagger**: Available at `http://localhost:3000/api/docs`
- **Postman**: Collection included in `/postman` directory

## 👥 Contributions

We welcome contributions! Fork the repo and create a pull request with your improvements.

## 📜 License

MIT License - see LICENSE file for details.
