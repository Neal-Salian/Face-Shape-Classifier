# 👓 Face Shape Classifier (Full Stack)

### 🚀 [Click Here to Try the Live Demo](https://your-app-name.vercel.app)

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
