from tensorflow.keras.applications.efficientnet import preprocess_input
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.models import load_model
from io import BytesIO
import numpy as np
from flask import jsonify, request, Flask
import os
import base64
from PIL import Image, UnidentifiedImageError
from flask_cors import CORS

app = Flask(__name__)

CORS(app, resources={r"/predict": {"origins": "*"}})

# Konfigurasi
IMG_SIZE = (224, 224)
BATCH_SIZE = 32

# Load model (prioritaskan .keras jika ingin format native Keras)
# MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "models", "best_efficientnet_tomato.keras")
MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "models", "best_efficientnet_tomato_2161")
model = load_model(MODEL_PATH)

# Label kelas penyakit (contoh, sesuaikan dengan label model Anda)
# Urutan label harus sama dengan output model
CLASS_NAMES = [
    "Bacterial Spot",
    "Early Blight",
    "Late Blight",
    "Leaf Mold",
    "Septoria Leaf Spot",
    "Spider Mites",
    "Target Spot",
    "Yellow Leaf Curl Virus",
    "Mosaic Virus",
    "Healthy"
]

def prepare_image(image, target_size):
    if image.mode != "RGB":
        image = image.convert("RGB")
    image = image.resize(target_size)
    image_array = img_to_array(image)
    image_array = np.expand_dims(image_array, axis=0)
    image_array = preprocess_input(image_array)
    return image_array

def process_image(image):
    try:
        input_arr = prepare_image(image, IMG_SIZE)
        preds = model.predict(input_arr, batch_size=BATCH_SIZE)
        confidence = float(np.max(preds))
        disease_index = int(np.argmax(preds))
        disease_name = CLASS_NAMES[disease_index]
        return {
            "disease": disease_name,
            "confidence": round(confidence, 4)
        }
    except Exception as e:
        return {"error": str(e)}

def base64_to_image(base64_string):
    try:
        if base64_string.startswith('data:'):
            base64_string = base64_string.split(',', 1)[1]
        image_data = base64.b64decode(base64_string)
        image = Image.open(BytesIO(image_data))
        return image
    except Exception as e:
        raise ValueError(f"Invalid base64 image: {str(e)}")

@app.route("/predict", methods=["POST"])
def predict():
    # Handle JSON input (base64)
    if request.content_type == 'application/json':
        json_data = request.get_json()
        results = []
        
        if 'images' in json_data:  # Multiple images
            for i, img_str in enumerate(json_data['images']):
                try:
                    image = base64_to_image(img_str)
                    result = process_image(image)
                    results.append(result)
                except Exception as e:
                    results.append({"error": str(e)})
        
        elif 'image' in json_data:  # Single image
            try:
                image = base64_to_image(json_data['image'])
                result = process_image(image)
                results.append(result)
            except Exception as e:
                results.append({"error": str(e)})
                
        else:
            return jsonify({"error": "No 'image' or 'images' field in JSON"}), 400
        
        return jsonify(results)
    
    # Handle form-data input (files)
    elif request.content_type.startswith('multipart/form-data'):
        if 'files' not in request.files and 'file' not in request.files:
            return jsonify({"error": "No file part in the request"}), 400
        
        files = request.files.getlist('file') + request.files.getlist('files')
        if not files:
            return jsonify({"error": "No files selected"}), 400
        
        results = []
        for file in files:
            if file.filename == '':
                results.append({"error": "Empty filename"})
                continue
                
            try:
                file_stream = BytesIO(file.read())
                file_stream.seek(0)
                image = Image.open(file_stream)
                result = process_image(image)
                results.append(result)
            except Exception as e:
                results.append({"error": str(e)})
        
        return jsonify(results)
    
    else:
        return jsonify({"error": "Unsupported content type"}), 400


@app.route("/", methods=["GET"])
def index():
    return """
    <h2>API Klasifikasi Penyakit Daun Tomat</h2>
    <h3>Multi-file Upload (form-data):</h3>
    <p>POST /predict dengan parameter:</p>
    <ul>
        <li>'file' atau 'files': Satu atau beberapa gambar</li>
    </ul>
    
    <h3>Base64 JSON Input:</h3>
    <p>POST /predict dengan header Content-Type: application/json dan body:</p>
    <pre>
{
    "image": "base64_string"   // Untuk satu gambar
}
ATAU
{
    "images": ["base64_string1", "base64_string2"]   // Untuk banyak gambar
}
    </pre>
    
    <h3>Response Format:</h3>
    <p>Array hasil prediksi untuk setiap gambar:</p>
    <pre>
[
    {"disease": "Bacterial Spot", "confidence": 0.95},
    {"error": "Invalid image format"},
    ...
]
    </pre>
    """

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)