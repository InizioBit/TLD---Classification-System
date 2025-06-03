import tensorflow as tf
from tensorflow.keras.models import load_model

# Path model asli (TF 2.15)
input_model_path = r'..\models\best_efficientnet_tomato.keras'

# Path untuk model hasil konversi (TF 2.16.1 compatible)
output_model_path = r'..\backend-api\models\best_efficientnet_tomato_2161'

# Muat model dengan penanganan custom object
try:
    # Coba muat tanpa custom objects
    model = load_model(input_model_path)
except:
    # Handle kemungkinan custom layer (umum pada EfficientNet)
    model = load_model(
        input_model_path,
        custom_objects={'FixedDropout': tf.keras.layers.Dropout}
    )

# Simpan dalam format TF SavedModel (direktori)
model.save(output_model_path, save_format="tf")

print(f"Model berhasil dikonversi ke TF 2.16.1 format dan disimpan di: {output_model_path}")