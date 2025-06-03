const IMG_SIZE = 224;

export const processImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      const img = new Image();
      
      img.onload = () => {
        try {
          // Create canvas for resizing
          const canvas = document.createElement('canvas');
          canvas.width = IMG_SIZE;
          canvas.height = IMG_SIZE;
          
          const ctx = canvas.getContext('2d');
          
          // Calculate aspect ratio and draw image
          const aspectRatio = img.width / img.height;
          let newWidth, newHeight, offsetX = 0, offsetY = 0;
          
          if (aspectRatio > 1) {
            newWidth = IMG_SIZE;
            newHeight = IMG_SIZE / aspectRatio;
            offsetY = (IMG_SIZE - newHeight) / 2;
          } else {
            newHeight = IMG_SIZE;
            newWidth = IMG_SIZE * aspectRatio;
            offsetX = (IMG_SIZE - newWidth) / 2;
          }
          
          // Draw image centered on canvas
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, IMG_SIZE, IMG_SIZE);
          ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
          
          // Convert to base64
          const base64Image = canvas.toDataURL('image/jpeg').split(',')[1];
          resolve(base64Image);
        } catch (error) {
          reject(error);
        }
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      img.src = event.target.result;
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
};