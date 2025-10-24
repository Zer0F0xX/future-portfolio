// File: lib/os/viewStore.ts
import { create } from 'zustand';
import * as THREE from 'three';

export type ViewState = 'orbit' | 'project';

type CameraTarget = {
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
};

type ViewStore = {
  view: ViewState;
  cameraTarget: CameraTarget | null;
  enterProjectView: (shardPosition: THREE.Vector3) => void;
  exitProjectView: () => void;
};

const ORBIT_POSITION = new THREE.Vector3(0, 2, 12);
const ORBIT_LOOKAT = new THREE.Vector3(0, 1, 0);

export const useViewStore = create<ViewStore>((set) => ({
  view: 'orbit',
  cameraTarget: null,
  enterProjectView: (shardPosition) =>
    set({
      view: 'project',
      cameraTarget: {
        position: shardPosition.clone().add(new THREE.Vector3(0, 0, 3)),
        lookAt: shardPosition,
      },
    }),
  exitProjectView: () =>
    set({
      view: 'orbit',
      cameraTarget: {
        position: ORBIT_POSITION,
        lookAt: ORBIT_LOOKAT,
      },
    }),
}));
