import { useState } from 'react';

export default function LogoImage({ src, alt, monogram, className }) {
  const [errored, setErrored] = useState(false);

  if (!src || errored) return <div className={className}>{monogram}</div>;

  return (
    <div className={className}>
      <img
        src={src}
        alt={alt}
        onError={() => setErrored(true)}
        style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 'inherit' }}
      />
    </div>
  );
}
