# AI Text Generator

A simple full-stack web application built using the MERN stack that takes a text prompt from the user and returns an AI-generated completion.

## 🚀 Features
* **Simple UI**: A clean frontend input field to type prompts and see text results instantly.
* **Secure API Connection**: Backend server safely handles requests to the AI model.
* **Lightweight**: Minimal setup focusing purely on the core text generation functionality.

## 📋 Prerequisites
* Node.js installed on your local machine.
* An AI API Key (OpenAI, Gemini, etc.).

## 🔧 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com
cd AI-Text-Generator
```

### 2. Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add your environment variables:
   ```env
   PORT=5000
   AI_API_KEY=your_actual_api_key_here
   ```
4. Start the backend server:
   ```bash
   npm start
   ```

### 3. Frontend Setup
1. Open a new terminal window, navigate back to the root, and go to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm run dev
   ```

## 💻 Tech Stack
* **Frontend**: React.js
* **Backend**: Node.js & Express.js
* **API Client**: Axios

## 📄 License
This project is open-source and available under the MIT License.
