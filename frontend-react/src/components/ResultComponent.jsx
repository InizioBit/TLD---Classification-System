import React from "react";

const ResultComponent = ({ results }) => {
  // Hitung ringkasan berdasarkan nama penyakit
  const diseaseSummary = results.reduce((acc, result) => {
    acc[result.disease] = (acc[result.disease] || 0) + 1;
    return acc;
  }, {});

  // Format confidence ke persen
  const formatConfidence = (conf) => (conf * 100).toFixed(1) + "%";

  // Warna berdasarkan confidence
  const getConfidenceColor = (conf) => {
    if (conf > 0.9) return "bg-green-100 text-green-800";
    if (conf > 0.7) return "bg-blue-100 text-blue-800";
    if (conf > 0.5) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Hasil Analisis</h2>

      {/* Ringkasan */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Ringkasan</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(diseaseSummary).map(([disease, count]) => (
            <div key={disease} className="bg-gray-50 p-3 rounded-md">
              <div className="font-medium">{disease}</div>
              <div className="text-sm text-gray-600">{count} gambar</div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail hasil */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Detail Hasil</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gambar</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Penyakit</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keyakinan</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {results.map((result, idx) => (
                <tr key={idx}>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Gambar {idx + 1}</td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{result.disease}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getConfidenceColor(result.confidence)}`}>
                      {formatConfidence(result.confidence)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ResultComponent;
