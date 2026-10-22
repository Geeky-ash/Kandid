import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, useCameraDevice, useCameraPermission } from 'react-native-vision-camera';
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

export const VisionViewfinder: React.FC<VisionViewfinderProps> = ({
  position,
  zoomLevel,
  onCameraReady,
}) => {
  const cameraRef = useRef<any>(null);
  const { hasPermission, requestPermission } = useCameraPermission();
  const [permissionRequested, setPermissionRequested] = useState(false);
  const device = useCameraDevice(position);

  useEffect(() => {
    if (!hasPermission && !permissionRequested) {
      setPermissionRequested(true);
      requestPermission();
    }
  }, [hasPermission, permissionRequested, requestPermission]);

  const targetZoom = Math.max(1, ZOOM_MULTIPLIERS[zoomLevel]);

  // fallback if camera permission not granted or device not detected
  if (!hasPermission || !device) {
    return (
      <View style={styles.fallbackContainer}>
        <View style={styles.fallbackAperture}>
          <Text style={styles.apertureIcon}>📷</Text>
        </View>
        <Text style={styles.fallbackTitle}>
          {!hasPermission ? 'camera access required' : 'simulated camera feed'}
        </Text>
        <Text style={styles.fallbackSubtitle}>
          {!hasPermission
            ? 'kandid needs camera access to guide your angles and compose shots.'
            : 'hardware camera initialized in preview mode.'}
        </Text>
        {!hasPermission && (
          <TouchableOpacity style={styles.grantButton} onPress={requestPermission}>
            <Text style={styles.grantButtonText}>grant camera permission</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }

  useEffect(() => {
    if (device && hasPermission) {
      onCameraReady?.();
    }
  }, [device, hasPermission, onCameraReady]);

  return (
    <Camera
      ref={cameraRef}
      style={StyleSheet.absoluteFill}
      device={device}
      isActive={true}
      zoom={targetZoom}
    />
  );
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
  apertureIcon: {
    fontSize: 28,
  },
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
    color: colors.text.onGold, // espresso strictly on gold per WCAG AA
  },
});
