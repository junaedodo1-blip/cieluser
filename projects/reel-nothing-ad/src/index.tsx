import React from 'react';
import { Composition, registerRoot } from 'remotion';
import { ProductAdReel } from './ProductAdReel';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ProductAdReel"
        component={ProductAdReel}
        durationInFrames={465}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};

registerRoot(RemotionRoot);
