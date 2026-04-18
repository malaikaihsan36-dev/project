// Ek utility file mein ye function bana lein
// src/components/imageHelper.js
export const getOptimizedImage = (url, width = 800) => {
  if (!url) return "";
  
  if (url.includes("cloudinary.com")) {
    // f_auto: automatic format (webp/avif)
    // q_auto: automatic quality compression
    // w_: specific width jo aap pass karein
    return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
  }
  return url;
};