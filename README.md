# Klasifikasi System Tomato Leaf Disease

Sistem klasifikasi penyakit daun tomat menggunakan model Deep Learning EfficientNet yang diintegrasikan dengan backend Flask API dan frontend React.js.

---

## Struktur Project

- `training/`  
  Kode dan skrip untuk melatih model EfficientNet pada dataset penyakit daun tomat.

- `backend/`  
  Flask API yang menerima gambar daun tomat dan mengembalikan hasil prediksi klasifikasi.

- `frontend/`  
  Aplikasi React.js untuk interaksi pengguna (upload gambar, preview, dan tampilan hasil).

---

## 1. Training Model

### Deskripsi

- Model menggunakan arsitektur EfficientNet-B0 pretrained dari ImageNet.
- Dilakukan fine-tuning pada dataset daun tomat yang sudah diberi label.
- Gambar diresize ke 224x224 piksel dan diproses dengan `preprocess_input`.
- Optimizer: Adam, loss: Categorical Crossentropy.
- Epochs: 25, Batch size: 32.

### Cara Menjalankan

1. Pastikan Python 3.x dan dependencies terinstall:

```

pip install tensorflow numpy matplotlib

```

2. Jalankan script training (contoh):

```

python train\_model.py

```

3. Model akan disimpan dalam format `.keras` di folder `models/`.

---

## 2. Backend API

### Deskripsi

- Framework: Flask + Flask-CORS.
- Endpoint `/predict` menerima POST request dengan gambar dalam format base64 JSON atau file upload multi-file.
- Menggunakan model EfficientNet yang telah dilatih untuk prediksi kelas penyakit.
- Mengembalikan JSON hasil prediksi berupa nama penyakit dan confidence score.

### Cara Menjalankan

1. Install dependencies backend:

```

pip install flask flask-cors tensorflow pillow numpy

```

2. Pastikan model `best_efficientnet_tomato.keras` tersedia di folder `models/`.

3. Jalankan backend server:

```

python app.py

```

4. API berjalan di `http://localhost:5000`.

---

## 3. Frontend React

### Deskripsi

- Dibangun menggunakan React.js dan Tailwind CSS.
- Pengguna dapat mengunggah satu atau beberapa gambar daun tomat.
- Preview gambar tampil sebelum dikirim ke backend.
- Hasil klasifikasi ditampilkan lengkap dengan confidence score dan ringkasan.

### Cara Menjalankan

1. Pastikan Node.js dan npm/yarn terinstall.

2. Masuk ke direktori frontend, install dependencies:

```

npm install

```

3. Jalankan aplikasi:

```

npm start

```

4. Buka browser di `http://localhost:3000`.

---

## 4. Struktur Folder

```

project-root/
│
├── training/
│   └── train\_model.py
│
├── backend/
│   ├── app.py
│   └── models/
│       └── best\_efficientnet\_tomato.keras
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── tailwind.config.js
│
└── README.md

```

---

## 5. Referensi

- [EfficientNet Paper](https://arxiv.org/abs/1905.11946)  
- [TensorFlow Keras Documentation](https://www.tensorflow.org/api_docs/python/tf/keras)  
- [Flask Documentation](https://flask.palletsprojects.com/)  
- [React Documentation](https://reactjs.org/)

---

## 6. Lisensi

Project ini menggunakan lisensi MIT. Silakan gunakan dan modifikasi sesuai kebutuhan dengan mencantumkan sumber.

---

## 7. Kontak

Untuk pertanyaan dan bantuan, silakan hubungi:

- Nama: Anie Rose Irawati  
- Email: anie.roseirawati@fmipa.unila.ac.id  
- Institusi: Universitas Lampung / Universitas Gadjah Mada



