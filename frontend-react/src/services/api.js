import { processImage } from './imageProcessor';

const API_ENDPOINT = 'https://fer-api.sipu.web.id/leaf_predict';
const BATCH_SIZE = 32;

export const processImages = async (files) => {
  const processedImages = [];
  
  for (const file of files) {
    try {
      const processedImage = await processImage(file);
      processedImages.push(processedImage);
    } catch (error) {
      console.error(`Error processing image ${file.name}:`, error);
      throw new Error(`Failed to process image ${file.name}`);
    }
  }
  
  return processedImages;
};

export const sendToAPI = async (processedImages) => {
  try {
    // Split images into batches
    const batches = [];
    for (let i = 0; i < processedImages.length; i += BATCH_SIZE) {
      batches.push(processedImages.slice(i, i + BATCH_SIZE));
    }
    
    let allResults = [];
    
    // Process each batch sequentially
    for (const batch of batches) {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          images: batch
        }),
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const batchResults = await response.json();
      allResults = [...allResults, ...batchResults];
    }
    
    return allResults;
  } catch (error) {
    console.error('Error sending images to API:', error);
    throw new Error('Failed to get predictions from API');
  }
};