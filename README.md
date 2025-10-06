# Quantum Random Number Generator

A modern web application that generates truly random numbers using quantum computing simulations. Built with React for the frontend and Flask with Qiskit for the backend.

## 🚀 Live Demo

- **Frontend**: [View on Vercel](https://quantum-random-number-generator-po8.vercel.app/)
- **Backend API**: [View on Render](https://quantum-random-number-generator-cio3.onrender.com)

## ✨ Features

- Generate random numbers from 1-100 using quantum superposition
- View generation history
- Responsive UI with Tailwind CSS
- Error handling and loading states
- True randomness via Qiskit quantum simulations

## 🛠 Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Python Flask, Qiskit Aer, Gunicorn
- **Platform**: Vercel (Frontend), Render (Backend)

## 🏗 Architecture

The app uses a full-stack architecture:
- Frontend makes POST requests to '/generate' endpoint
- Backend uses Qiskit to simulate 7-qubit quantum circuit
- API returns random numbers with quantum-measured entropy

## 📚 Prerequisites

- Node.js 18+
- Python 3.8+

## 🚀 Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/RafaelMota02/quantum-random-number-generator.git
   cd quantum-random-number-generator
   ```

2. **Setup backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   python app.py
   ```
   Backend runs on http://localhost:5000

3. **Setup frontend**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```
   Frontend runs on http://localhost:5173

## 📡 API Documentation

### Generate Random Number
- **Endpoint**: `POST /generate`
- **Response**: 
  ```json
  {
    "random_number": 42,
    "range": "1-100 (7 qubits)"
  }
  ```

## 🤝 Contributing

Fork the repo, create a feature branch, and submit a PR.

## ⚛ Quantum Details

Uses Qiskit Aer simulator with 7 qubits in superposition, measurement provides 128 possible outcomes mapped to 1-100 range for uniform distribution.
