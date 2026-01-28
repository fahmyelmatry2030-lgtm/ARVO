import Image from 'next/image'
import { useState, ImgHTMLAttributes } from 'react'

type SafeImageProps = {
  src: string
  fallback?: string
  alt?: string
  // allow passing arbitrary props like fill, style, sizes
  [key: string]: any
}

export default function SafeImage({ src, fallback = 'https://via.placeholder.com/600x600?text=No+Image', alt, ...rest }: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState<string>(src)

  const isProd = process.env.NODE_ENV === 'production'

  const handleError = () => {
    if (currentSrc !== fallback) setCurrentSrc(fallback)
  }

  // split rest to avoid passing src/alt twice and to handle `fill` prop
  const { src: _s, alt: _a, fill, style, ...forward } = rest as any

  if (isProd) {
    return (
      <Image
        src={currentSrc}
        alt={alt ?? ''}
        onError={handleError}
        fill={fill}
        {...forward}
      />
    )
  }

  // Prepare props for plain <img> in dev. If `fill` was requested, emulate it via styles.
  const imgStyle = { ...(style || {}) } as any
  if (fill) {
    imgStyle.width = '100%'
    imgStyle.height = '100%'
    if (!imgStyle.objectFit) imgStyle.objectFit = 'cover'
    // ensure block formatting
    imgStyle.display = imgStyle.display || 'block'
  }

  const imgProps: ImgHTMLAttributes<HTMLImageElement> = {
    src: currentSrc,
    alt: alt ?? '',
    onError: () => handleError(),
    style: imgStyle,
    ...(forward as any),
  }

  return <img {...imgProps} />
}
