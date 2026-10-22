import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, radius, space, typography } from '@kandid/ui-tokens';
import { CameraPosition, ZoomLevel } from '../../stores/cameraStore';

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

const FallbackViewfinder: React.FC<{
  title: string;
  subtitle: string;
  onRequestPermission?: () => void;
}> = ({ title, subtitle, onRequestPermission }) => (
  <View style={styles.fallbackContainer}>
    <View style={styles.fallbackAperture}>
      <Text style={styles.apertureIcon}>📷</Text>
    </View>
    <Text style={styles.fallbackTitle}>{title}</Text>
    <Text style={styles.fallbackSubtitle}>{subtitle}</Text>
    {onRequestPermission && (
      <TouchableOpacity style={styles.grantButton} onPress={onRequestPermission}>
        <Text style={styles.grantButtonText}>grant camera permission</Text>
      </TouchableOpacity>
    )}
  </View>
);

const ActiveCameraFeed: React.FC<VisionViewfinderProps> = ({
  position,
  zoomLevel,
  onCameraReady,
}) => {
  const cameraRef = useRef<any>(null);
  const { hasPermission, requestPermission } = useCamPermission();
  const [requested, setRequested] = useState(false);
  const device = useCamDevice(position);

  useEffect(() => {
    if (!hasPermission && !requested) {
      setRequested(true);
      requestPermission();
    }
  }, [hasPermission, requested, requestPermission]);

  useEffect(() => {
    if (device && hasPermission) onCameraReady?.();
  }, [device, hasPermission, onCameraReady]);

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

  return (
    <NativeCamera
      ref={cameraRef}
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      zoom={Math.max(1, ZOOM_MULTIPLIERS[zoomLevel])}
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

const styles = StyleSheet.create({
  fallbackContainer: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#0E0D0C',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: space.lg,
  },
  fallbackAperture: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(252, 249, 244, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(197, 168, 128, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: space.md,
  },
  apertureIcon: { fontSize: 28 },
  fallbackTitle: {
    fontFamily: typography.fontFamilies.headline,
    fontSize: typography.fontSize.headlineSm,
    color: colors.background.primary,
    marginBottom: space.xs,
    textAlign: 'center',
  },
  fallbackSubtitle: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.bodySm,
    color: 'rgba(252, 249, 244, 0.65)',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: space.md,
  },
  grantButton: {
    backgroundColor: colors.brand.gold,
    paddingHorizontal: space.md,
    paddingVertical: space.sm,
    borderRadius: radius.pill,
  },
  grantButtonText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.labelSm,
    fontWeight: typography.fontWeight.bold,
    color: colors.text.onGold,
  },
});
