import React from "react";

const UploadComponent = ({ onFilesChange, isLoading }) => {
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    onFilesChange(selectedFiles);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Unggah Gambar Daun Tomat</h2>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <input
          type="file"
          id="file-upload"
          className="hidden"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          disabled={isLoading}
        />
        <label
          htmlFor="file-upload"
          className={`cursor-pointer flex flex-col items-center justify-center space-y-2 ${isLoading ? "opacity-50" : ""}`}
        >
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <span className="text-gray-600">
            {isLoading ? "Memproses..." : "Klik untuk memilih atau drag & drop gambar"}
          </span>
          <span className="text-sm text-gray-500">Mendukung JPG, PNG (Maksimal 32 gambar sekaligus)</span>
        </label>
      </div>
    </div>
  );
};

export default UploadComponent;
