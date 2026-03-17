import { createElement } from 'react';
import type { ImgHTMLAttributes } from 'react';

type RawImageProps = ImgHTMLAttributes<HTMLImageElement>;

// Used for legacy content and arbitrary remote images where next/image is not practical.
export default function RawImage(props: RawImageProps) {
  return createElement('img', props);
}
