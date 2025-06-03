import React from "react";

const diseaseExamples = [
  {
    name: "Bercak Bakteri (Bacterial Spot)",
    examples: ["Contoh gambar 1", "Contoh gambar 2", "Contoh gambar 3"],
    description: "Bercak kecil berwarna gelap seperti terendam air pada daun dengan halo kuning.",
  },
  {
    name: "Layu Awal (Early Blight)",
    examples: ["Contoh gambar 1", "Contoh gambar 2", "Contoh gambar 3"],
    description: "Cincin konsentris pada daun dengan halo kuning, biasanya mulai dari daun bawah.",
  },
  {
    name: "Layu Akhir (Late Blight)",
    examples: ["Contoh gambar 1", "Contoh gambar 2", "Contoh gambar 3"],
    description: "Lesi hijau-hitam tidak beraturan yang cepat membesar.",
  },
  {
    name: "Bercak Target (Target Spot)",
    examples: ["Contoh gambar 1", "Contoh gambar 2", "Contoh gambar 3"],
    description: "Bercak coklat dengan pola cincin menyerupai target.",
  },
  {
    name: "Virus Kuning Daun Melengkung (Yellow Leaf Curl Virus)",
    examples: ["Contoh gambar 1", "Contoh gambar 2", "Contoh gambar 3"],
    description: "Daun menguning dan melengkung ke atas, pertumbuhan terhambat.",
  },
  {
    name: "Sehat (Healthy)",
    examples: ["Contoh gambar 1", "Contoh gambar 2", "Contoh gambar 3"],
    description: "Daun hijau segar tanpa bercak atau perubahan warna.",
  },
];

const DiseaseExamples = () => {
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
              {disease.examples.map((ex, i) => (
                <div key={i} className="aspect-square bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-sm">
                  [Gambar contoh]
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
