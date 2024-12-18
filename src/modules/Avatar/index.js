import React from 'react';
import './style.scss';

const Avatar = ({ src, alt, size }) => {
  return (
    <div className="avatar" style={{ width: size, height: size }}>
      {src ? (
        <img src={src} alt={alt} />
      ) : (
        <div className="avatar-placeholder">{alt[0]}</div>
      )}
    </div>
  );
};

export default Avatar;
