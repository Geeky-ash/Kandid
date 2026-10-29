import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { CameraPosition, ZoomLevel } from '../../stores/cameraStore';
import { FallbackViewfinder } from './FallbackViewfinder';

interface VisionViewfinderProps {
  position: CameraPosition;
  zoomLevel: ZoomLevel;
  onCameraReady?: () => void;
  onPhotoTaken?: (uri: string) => void;
}

const ZOOM_MULTIPLIERS: Record<ZoomLevel, number> = {
  '0.5x': 0.5,
  '1x': 1.0,
  '2x': 2.0,
  '3x': 3.0,
};

let NativeCamera: any = null;
let useCamDevice: any = null;
let useCamPermission: any = null;

try {
  const VC = require('react-native-vision-camera');
  NativeCamera = VC.Camera;
  useCamDevice = VC.useCameraDevice;
  useCamPermission = VC.useCameraPermission;
} catch {
  NativeCamera = null;
}

const ActiveCameraFeed: React.FC<VisionViewfinderProps> = ({
  position,
  zoomLevel,
  onCameraReady,
}) => {
  const cameraRef = useRef<any>(null);
  const { hasPermission, requestPermission } = useCamPermission();
  const [requested, setRequested] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const device = useCamDevice(position);

  useEffect(() => {
    if (!hasPermission && !requested) {
      setRequested(true);
      requestPermission();
    }
  }, [hasPermission, requested, requestPermission]);

  if (!hasPermission || !device) {
    return (
      <FallbackViewfinder
        title={!hasPermission ? 'camera access required' : 'simulated camera feed'}
        subtitle={
          !hasPermission
            ? 'kandid needs camera access to guide your angles and compose shots.'
            : 'hardware camera initialized in preview mode.'
        }
        onRequestPermission={!hasPermission ? requestPermission : undefined}
      />
    );
  }

  const rawZoom = ZOOM_MULTIPLIERS[zoomLevel] ?? 1.0;
  const minZoom = device.minZoom ?? 1.0;
  const maxZoom = device.maxZoom ?? 10.0;
  const clampedZoom = Math.max(minZoom, Math.min(maxZoom, rawZoom));

  return (
    <NativeCamera
      ref={cameraRef}
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      onInitialized={() => {
        setIsInitialized(true);
        onCameraReady?.();
      }}
      onError={(err: any) => {
        console.warn('VisionCamera handled error:', err?.message || err);
      }}
      zoom={isInitialized ? clampedZoom : undefined}
    />
  );
};

export const VisionViewfinder: React.FC<VisionViewfinderProps> = props => {
  if (!NativeCamera || !useCamDevice || !useCamPermission) {
    return (
      <FallbackViewfinder
        title="simulated viewfinder"
        subtitle="previewing editorial angles and pose guidance overlay."
      />
    );
  }

  return <ActiveCameraFeed {...props} />;
};
