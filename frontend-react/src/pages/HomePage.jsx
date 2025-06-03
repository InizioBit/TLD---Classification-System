import React, { useState } from 'react';
import UploadComponent from '../components/UploadComponent';
import PreviewComponent from '../components/PreviewComponent';
import ResultComponent from '../components/ResultComponent';
import DiseaseExamples from '../components/DiseaseExamples';

const HomePage = () => {
  const [files, setFiles] = useState([]);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFilesChange = (newFiles) => {
    setFiles(newFiles);
    setResults([]);
    setError(null);
  };

  const handleReset = () => {
    setFiles([]);
    setResults([]);
    setError(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
        Tomato Leaf Disease Classifier
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <UploadComponent 
            onFilesChange={handleFilesChange} 
            onReset={handleReset}
            isLoading={isLoading}
          />
          {files.length > 0 && (
            <PreviewComponent 
              files={files} 
              setResults={setResults}
              setIsLoading={setIsLoading}
              setError={setError}
            />
          )}
        </div>
        
        <div className="space-y-6">
          {results.length > 0 ? (
            <ResultComponent results={results} />
          ) : (
            <DiseaseExamples />
          )}
        </div>
      </div>
      
      {error && (
        <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
    </div>
  );
};

export default HomePage;