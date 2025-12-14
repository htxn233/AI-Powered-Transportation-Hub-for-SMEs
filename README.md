# AI-Powered Transportation Hub for SMEs

A web-based logistics management system designed to support small and medium-sized enterprises (SMEs) in handling transportation, order processing, and delivery operations efficiently without owning logistics infrastructure.

## 📌 Features
- Role-based access control: **Admin, SME, Shipper, Warehouse Staff**
- Order creation and management
- Barcode/QR code scanning for warehouse processing
- Automated shipper assignment
- AI-assisted route optimization
- Real-time order tracking
- Operational dashboards for logistics monitoring

## 🛠 Tech Stack
### Frontend
- JavaScript (ES6+)
- React.js
- HTML5, CSS3

### Backend
- Node.js (Express)
- FastAPI (AI & routing services)
- RESTful APIs

### Database
- MySQL

### Tools
- Git/GitHub
- Postman

## 📂 System Roles
- **Admin:** Manage users, system configuration, and monitoring
- **SME:** Create orders, track deliveries, view reports
- **Warehouse Staff:** Scan packages, update warehouse status
- **Shipper:** Receive delivery tasks, update delivery progress

## ⚙️ System Architecture
The system follows a client–server architecture with:
- React frontend consuming RESTful APIs
- Node.js backend handling business logic and authentication
- FastAPI service providing AI-based routing optimization
- Databases for order, user, and logistics data

## 🚀 Getting Started
### Prerequisites
- Node.js >= 18
- npm or yarn
- MongoDB / MySQL

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/transport-logistics-system.git

# Install frontend dependencies
cd frontend
npm install
npm start

# Install backend dependencies
cd backend
npm install
npm run dev

