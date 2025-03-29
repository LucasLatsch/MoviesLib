import React from "react";

const StarRating = ({ rating }) => {
  // Converter nota de 0-10 para escala de 0-5
  const normalizedRating = (rating / 10) * 5;
  const fillPercentage = (normalizedRating / 5) * 100;

  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Estrela de fundo (cinza) */}
      <path
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        fill="lightgray"
      />

      {/* Estrela preenchida dinamicamente */}
      <rect
        x="0"
        y="0"
        width={`${fillPercentage}%`}
        height="100%"
        fill="gold"
        clipPath="url(#clip-star)"
      />

      <defs>
        <clipPath id="clip-star">
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default StarRating;
