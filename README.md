# 👓 Face Shape Classifier (Full Stack)

### 🚀 [Click Here to Try the Live Demo](https://face-shape-classifier.vercel.app/)

A full-stack AI application that analyzes facial features to predict face shape (Oval, Round, Square, Heart, Oblong) and recommends suitable eyewear.

> **⚠️ Note:** The backend is hosted on Render's free tier. The first prediction may take **60-90 seconds** to wake up the server. Please be patient! Subsequent requests will be instant.

## 🏗️ Architecture

This project is a monorepo containing two distinct parts:

* **Frontend (`/frontend`):** Built with **Next.js** and **Tailwind CSS**. Hosted on **Vercel**.
* **Backend (`/backend`):** Built with **FastAPI** and **TensorFlow**. Hosted on **Render**.

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | Next.js (React), Tailwind CSS, Lucide Icons |
| **Backend** | Python, FastAPI, Uvicorn |
| **AI/ML** | TensorFlow (Keras), Pillow, NumPy |
| **Deployment** | Vercel (FE) + Render (BE) |

## 📂 Project Structure

```bash
Face-Shape-Classifier/
├── frontend/               # Next.js Application
│   ├── app/                # React Pages
│   └── public/             # Static Assets
│
└── backend/                # Python API
    ├── main.py             # FastAPI Server
    ├── requirements.txt    # Python Dependencies
    └── face_classification_final2.h5  # AI Model

```
## 🚀 Getting Started Locally
To run this project on your machine, you need to run both the frontend and backend terminals simultaneously.

1. Setup Backend (Python)

Open a terminal and navigate to the backend folder:
```
cd face-shape-backend
pip install -r requirements.txt
uvicorn main:app --reload
```
The API will start at http://127.0.0.1:8000
2. Setup Frontend (React)

Open a new terminal and navigate to the frontend folder:
```
cd face-shape-frontend
npm install
npm run dev
```
The UI will start at http://localhost:3000
3. Connect Them

Open face-shape-frontend/app/page.tsx and change the BACKEND_URL to localhost:
```
const BACKEND_URL = "[http://127.0.0.1:8000/predict](http://127.0.0.1:8000/predict)";
```
## 📡 API Endpoints
POST /predict

Description: Uploads an image for classification.

Body: multipart/form-data with key file.

Response:
```
{
  "class": "Square",
  "confidence": 0.98,
  "recommendations": "Round, Oval, Cat-eye"
}
```
## 🛡️ License
This project is licensed under the MIT License.
