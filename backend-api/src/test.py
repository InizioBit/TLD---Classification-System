import tensorflow as tf
from tensorflow.keras.models import load_model

# Konfigurasi input
IMG_SIZE = (224, 224)
BATCH_SIZE = 32

# Path model
input_model_path = r'..\models\best_efficientnet_tomato.keras'
output_model_path = r'..\models\best_efficientnet_tomato_2161.keras'

# Muat model dengan penanganan custom object
try:
    model = load_model(input_model_path)
except:
    # Handle custom layer untuk EfficientNet
    model = load_model(
        input_model_path,
        custom_objects={'FixedDropout': tf.keras.layers.Dropout}
    )

# Verifikasi input shape
if model.input_shape[1:3] != IMG_SIZE:
    print(f"Peringatan: Model mengharapkan input shape {model.input_shape[1:3]}, tapi konfigurasi IMG_SIZE {IMG_SIZE}")

# Simpan dalam format Keras V3
model.save(output_model_path, save_format="keras")
print(f"Model berhasil dikonversi dan disimpan di: {output_model_path}")