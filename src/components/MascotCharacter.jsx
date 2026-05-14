import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, Center } from '@react-three/drei';
import * as THREE from 'three';

export default function MascotCharacter({ mouse }) {
  const groupRef  = useRef();
  const { scene, animations } = useGLTF('/models/mascot.glb');

  /* Play any built-in idle animation if the model has one */
  const { actions, names } = useAnimations(animations, groupRef);
  React.useEffect(() => {
    if (names.length > 0) {
      // Try to find an idle animation or just play the first one
      const idleAction = actions['idle'] || actions[names[0]];
      idleAction?.reset().fadeIn(0.5).play();
    }
  }, [actions, names]);

  /* Mouse-following head/body tilt */
  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.x * 0.5,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouse.y * 0.2,
      0.05
    );
  });

  return (
    <group ref={groupRef} scale={1.1}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

useGLTF.preload('/models/mascot.glb');
