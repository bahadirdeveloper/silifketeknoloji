import { useEffect, useState } from 'react';

interface UseImagePreloadOptions {
  priority?: boolean;
}

export const useImagePreload = (imageUrls: string[], options: UseImagePreloadOptions = {}) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const { priority = false } = options;

  useEffect(() => {
    if (!imageUrls.length) {
      setIsLoading(false);
      return;
    }

    let loadedCount = 0;
    const totalImages = imageUrls.length;

    const preloadImage = (url: string) => {
      return new Promise<string>((resolve, reject) => {
        const img = new Image();
        
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, url]));
          loadedCount++;
          
          if (loadedCount === totalImages) {
            setIsLoading(false);
          }
          
          resolve(url);
        };
        
        img.onerror = () => {
          console.warn(`Failed to load image: ${url}`);
          loadedCount++;
          
          if (loadedCount === totalImages) {
            setIsLoading(false);
          }
          
          setHasError(true);
          reject(new Error(`Failed to load image: ${url}`));
        };

        // Set loading priority
        if (priority) {
          img.loading = 'eager';
        }
        
        img.src = url;
      });
    };

    // Preload images with optional batching for performance
    const preloadBatch = async () => {
      try {
        if (priority) {
          // Load priority images immediately
          await Promise.allSettled(imageUrls.map(preloadImage));
        } else {
          // Load non-priority images in smaller batches
          const batchSize = 3;
          for (let i = 0; i < imageUrls.length; i += batchSize) {
            const batch = imageUrls.slice(i, i + batchSize);
            await Promise.allSettled(batch.map(preloadImage));
            
            // Small delay between batches to prevent overwhelming the browser
            if (i + batchSize < imageUrls.length) {
              await new Promise(resolve => setTimeout(resolve, 50));
            }
          }
        }
      } catch (error) {
        console.error('Error preloading images:', error);
        setHasError(true);
        setIsLoading(false);
      }
    };

    preloadBatch();
  }, [imageUrls, priority]);

  return {
    loadedImages,
    isLoading,
    hasError,
    isImageLoaded: (url: string) => loadedImages.has(url)
  };
};

export default useImagePreload;
