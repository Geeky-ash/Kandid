import { create } from 'zustand';

export type FlashMode = 'off' | 'on' | 'auto';
export type TimerDuration = 0 | 3 | 10;
export type ZoomLevel = '0.5x' | '1x' | '2x' | '3x';
export type CameraPosition = 'back' | 'front';
export type ShutterMode = 'single' | 'series';
export type SoftLightColor = 'neutral' | 'warm3200' | 'golden4500';

interface CameraState {
  flash: FlashMode;
  timer: TimerDuration;
  showGrid: boolean;
  showSoftLight: boolean;
  softLightColor: SoftLightColor;
  softLightBrightness: number;
  zoomLevel: ZoomLevel;
  cameraPosition: CameraPosition;
  shutterMode: ShutterMode;
  burstInterval: number; // in seconds: 2, 3, or 5
  isCapturing: boolean;
  countdown: number;
  capturedPhotos: string[];
  setFlash: (mode: FlashMode) => void;
  toggleFlash: () => void;
  setTimer: (t: TimerDuration) => void;
  toggleTimer: () => void;
  toggleGrid: () => void;
  setShowSoftLight: (show: boolean) => void;
  setSoftLightColor: (color: SoftLightColor) => void;
  setSoftLightBrightness: (brightness: number) => void;
  setZoomLevel: (z: ZoomLevel) => void;
  toggleCameraPosition: () => void;
  setShutterMode: (m: ShutterMode) => void;
  setBurstInterval: (seconds: number) => void;
  setIsCapturing: (capturing: boolean) => void;
  setCountdown: (val: number) => void;
  addCapturedPhoto: (uri: string) => void;
}

export const useCameraStore = create<CameraState>((set, get) => ({
  flash: 'off',
  timer: 0,
  showGrid: true,
  showSoftLight: false,
  softLightColor: 'warm3200',
  softLightBrightness: 0.85,
  zoomLevel: '1x',
  cameraPosition: 'back',
  shutterMode: 'single',
  burstInterval: 3,
  isCapturing: false,
  countdown: 0,
  capturedPhotos: [],

  setFlash: flash => set({ flash }),
  toggleFlash: () => {
    const next: Record<FlashMode, FlashMode> = { off: 'on', on: 'auto', auto: 'off' };
    set({ flash: next[get().flash] });
  },

  setTimer: timer => set({ timer }),
  toggleTimer: () => {
    const next: Record<TimerDuration, TimerDuration> = { 0: 3, 3: 10, 10: 0 };
    set({ timer: next[get().timer] });
  },

  toggleGrid: () => set(state => ({ showGrid: !state.showGrid })),
  setShowSoftLight: showSoftLight => set({ showSoftLight }),
  setSoftLightColor: softLightColor => set({ softLightColor }),
  setSoftLightBrightness: softLightBrightness => set({ softLightBrightness }),
  setZoomLevel: zoomLevel => set({ zoomLevel }),
  toggleCameraPosition: () =>
    set(state => ({ cameraPosition: state.cameraPosition === 'back' ? 'front' : 'back' })),
  setShutterMode: shutterMode => set({ shutterMode }),
  setBurstInterval: burstInterval => set({ burstInterval }),
  setIsCapturing: isCapturing => set({ isCapturing }),
  setCountdown: countdown => set({ countdown }),
  addCapturedPhoto: uri =>
    set(state => ({ capturedPhotos: [uri, ...state.capturedPhotos] })),
}));
