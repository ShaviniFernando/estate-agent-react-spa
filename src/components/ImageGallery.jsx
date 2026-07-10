import { useState } from 'react';

export default function ImageGallery({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="image-gallery">
      <div className="gallery-main">
        <button onClick={prev}>Previous</button>
        <img src={images[currentIndex]} alt={`Property image ${currentIndex + 1}`} />
        <button onClick={next}>Next</button>
      </div>
      <div className="thumbnail-row">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Thumbnail ${i + 1}`}
            className={`thumbnail${i === currentIndex ? ' active' : ''}`}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}
