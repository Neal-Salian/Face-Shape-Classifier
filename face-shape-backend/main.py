from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import io
from PIL import Image
import tensorflow as tf

app = FastAPI()

# Allow your future Vercel frontend to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the model
try:
    model = tf.keras.models.load_model("face_classification_final2.h5")
    print("Model loaded successfully.")
except Exception as e:
    print(f"Error loading model: {e}")
    model = None

# Class names (Ensure this order matches your training labels exactly)
CLASS_NAMES = ['Heart', 'Oblong', 'Oval', 'Round', 'Square']

def preprocess_image(image_bytes):
    # Open image
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
    # Resize to model input size
    image = image.resize((224, 224))
    # Convert to array
    img_array = np.array(image)
    # Normalize (0-1)
    img_array = img_array / 255.0
    # Add batch dimension
    img_array = np.expand_dims(img_array, axis=0)
    return img_array

@app.get("/")
def home():
    return {"status": "Backend is running"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    image_bytes = await file.read()
    processed_image = preprocess_image(image_bytes)
    
    predictions = model.predict(processed_image)
    score = tf.nn.softmax(predictions[0])
    
    class_index = np.argmax(score)
    confidence = float(np.max(score))
    
    return {
        "class": CLASS_NAMES[class_index],
        "confidence": confidence,
        "recommendations": get_recommendations(CLASS_NAMES[class_index])
    }

def get_recommendations(shape):
    recs = {
        "Heart": "Aviator, Wayfarer, Rimless",
        "Oblong": "Square, Geometric, Oversized",
        "Oval": "Aviator, Walnut, Square",
        "Round": "Rectangular, Geometric, Upswept",
        "Square": "Round, Oval, Cat-eye"
    }
    return recs.get(shape, "General frames")