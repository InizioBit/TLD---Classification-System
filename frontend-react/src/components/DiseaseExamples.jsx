import React, { useState, useEffect } from "react";

const diseaseExamples = [
  {
    name: "Bercak Bakteri (Bacterial Spot)",
    folder: "Tomato___Bacterial_spot",
    description: "Bercak kecil berwarna gelap seperti terendam air pada daun dengan halo kuning.",
  },
  {
    name: "Layu Awal (Early Blight)",
    folder: "Tomato___Early_blight",
    description: "Cincin konsentris pada daun dengan halo kuning, biasanya mulai dari daun bawah.",
  },
  {
    name: "Sehat (Healthy)",
    folder: "Tomato___healthy",
    description: "Daun hijau segar tanpa bercak atau perubahan warna.",
  },
  {
    name: "Layu Akhir (Late Blight)",
    folder: "Tomato___Late_blight",
    description: "Lesi hijau-hitam tidak beraturan yang cepat membesar.",
  },
  {
    name: "Jamur Daun (Leaf Mold)",
    folder: "Tomato___Leaf_Mold",
    description: "Bercak kuning di bagian atas daun dan jamur beludru ungu di bagian bawah.",
  },
  {
    name: "Bercak Daun Septoria (Septoria Leaf Spot)",
    folder: "Tomato___Septoria_leaf_spot",
    description: "Bercak kecil bulat dengan pusat abu-abu dan pinggiran gelap.",
  },
  {
    name: "Tungau Laba-Laba Dua Titik (Spider Mites)",
    folder: "Tomato___Spider_mites_Two_spotted_spider_mite",
    description: "Daun menguning, bintik-bintik kecil, dan terdapat jaring halus di permukaan daun.",
  },
  {
    name: "Bercak Target (Target Spot)",
    folder: "Tomato___Target_Spot",
    description: "Bercak coklat dengan pola cincin menyerupai target.",
  },
  {
    name: "Virus Mosaic Tomat (Tomato Mosaic Virus)",
    folder: "Tomato___Tomato_mosaic_virus",
    description: "Pola mosaik kuning-hijau pada daun, daun keriting dan pertumbuhan terhambat.",
  },
  {
    name: "Virus Kuning Daun Melengkung (Yellow Leaf Curl Virus)",
    folder: "Tomato___Tomato_Yellow_Leaf_Curl_Virus",
    description: "Daun menguning dan melengkung ke atas, pertumbuhan terhambat.",
  },
];


// Fungsi untuk memilih 3 angka acak unik dari 1-10
const getRandomIndices = () => {
  const indices = [];
  while (indices.length < 3) {
    const randomNum = Math.floor(Math.random() * 10) + 1;
    if (!indices.includes(randomNum)) {
      indices.push(randomNum);
    }
  }
  return indices;
};

const DiseaseExamples = () => {
  const [randomImages, setRandomImages] = useState({});

  // Generate gambar acak saat komponen dimount
  useEffect(() => {
    const initialImages = {};
    diseaseExamples.forEach(disease => {
      initialImages[disease.folder] = getRandomIndices();
    });
    setRandomImages(initialImages);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Contoh Penyakit Daun Tomat</h2>
      <p className="text-gray-600 mb-6">
        Unggah gambar daun tomat untuk mendeteksi penyakit potensial. Berikut adalah contoh penyakit daun tomat yang umum:
      </p>
      <div className="space-y-6">
        {diseaseExamples.map((disease, idx) => (
          <div key={idx} className="border-b border-gray-200 pb-6 last:border-0">
            <h3 className="text-lg font-medium text-green-700 mb-2">{disease.name}</h3>
            <p className="text-gray-600 mb-3">{disease.description}</p>
            <div className="grid grid-cols-3 gap-2">
              {randomImages[disease.folder]?.map((imageIndex, i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-md overflow-hidden">
                  <img 
                    src={`${process.env.PUBLIC_URL}/images/${disease.folder}/${imageIndex}.JPG`} 
                    alt={`Contoh ${disease.name}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `${process.env.PUBLIC_URL}/images/fallback.jpg`;
                      e.target.alt = "Gambar tidak tersedia";
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiseaseExamples;