import React from 'react';
import { processImages, sendToAPI } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const PreviewComponent = ({ files, setResults, setIsLoading, setError }) => {
  const handleSubmit = async () => {
    if (files.length === 0) return;
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Process images and send to API
      const processedImages = await processImages(files);
      const apiResults = await sendToAPI(processedImages);
      
      setResults(apiResults);
    } catch (err) {
      setError('Failed to process images. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Gambar yang dipilih ({files.length})
        </h2>
        <button
          onClick={handleSubmit}
          disabled={files.length === 0}
          className={`px-4 py-2 rounded-md text-white ${files.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
        >
          Analisa Gambar
        </button>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 max-h-96 overflow-y-auto p-2">
        {files.map((file, index) => (
          <div key={index} className="relative aspect-square">
            <img
              src={URL.createObjectURL(file)}
              alt={`Preview ${index + 1}`}
              className="w-full h-full object-cover rounded border border-gray-200"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
              {file.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviewComponent;