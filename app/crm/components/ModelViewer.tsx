'use client';

import { useEffect, useRef } from 'react';

// ============================================================
// Wraps Google's <model-viewer> web component for GLB preview.
// We load the script once on mount via dynamic import, the same
// way OfficeMate's existing jupiter/index.html does, so the two
// stay in sync.
// ============================================================

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          'camera-controls'?: boolean;
          'auto-rotate'?: boolean;
          'shadow-intensity'?: string | number;
          exposure?: string | number;
          ar?: boolean;
          poster?: string;
        },
        HTMLElement
      >;
    }
  }
}

type Props = {
  src: string;
  alt?: string;
  height?: number;
};

export default function ModelViewer({ src, alt, height = 380 }: Props) {
  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) return;
    loaded.current = true;
    // Only inject once per page load.
    if (document.querySelector('script[data-model-viewer]')) return;

    const s = document.createElement('script');
    s.type = 'module';
    s.src =
      'https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js';
    s.setAttribute('data-model-viewer', '');
    document.head.appendChild(s);
  }, []);

  return (
    <model-viewer
      src={src}
      alt={alt || '3D model preview'}
      camera-controls
      auto-rotate
      shadow-intensity="1"
      exposure="1"
      className="crm-model-viewer"
      style={{ height: `${height}px` }}
    />
  );
}
