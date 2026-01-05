import React from 'react';

type Props = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  priority?: boolean; // for critical images
};

export default function OptimizedImage({ src, alt, priority, className, ...rest }: Props) {
  const loading = priority ? undefined : 'lazy';
  // `fetchPriority` is supported in modern browsers; TS doesn't include it on ImgHTMLAttributes in some configs
  const fetchPriority = priority ? 'high' : 'low';

  return (
    <img
      src={src}
      alt={alt ?? ''}
      className={className}
      loading={loading as any}
      decoding="async"
      // @ts-ignore
      fetchPriority={fetchPriority}
      {...rest}
    />
  );
}
