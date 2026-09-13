import React from 'react';

export default function ImagePlaceholder({
  src,
  alt = 'Imagem do pet',
  width,
  height,
  radius,
  className = '',
  style,
  label,
  dimensions,
  ...props
}) {
  const imageStyle = {
    width: width || '100%',
    height: height || '100%',
    objectFit: 'cover',
    display: 'block',
    borderRadius: radius || 'var(--radius)',
    ...style,
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={imageStyle}
        {...props}
      />
    );
  }

  return (
    <div
      className={`placeholder-box ${className}`}
      style={{
        width: width || '100%',
        height: height || '100%',
        minHeight: height || '180px',
        borderRadius: radius || 'var(--radius)',
        ...style,
      }}
      role="img"
      aria-label={alt}
      {...props}
    >
      <div className="placeholder-icon">📷</div>
      <div className="placeholder-label">{label || 'Espaço para Imagem'}</div>
      <div className="placeholder-dimensions">{dimensions || 'Insira a foto do produto aqui'}</div>
    </div>
  );
}
