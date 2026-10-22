import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { seedPoses, getPoseById } from '@kandid/content';
import { useCameraStore } from '../src/stores/cameraStore';
import { VisionViewfinder } from '../src/components/camera/VisionViewfinder';
import { CameraOverlay } from '../src/components/camera/CameraOverlay';
import { CameraTopBar } from '../src/components/camera/CameraTopBar';
import { CueCard } from '../src/components/camera/CueCard';
import { ShutterBar } from '../src/components/camera/ShutterBar';
import { SoftLightModal } from '../src/components/camera/SoftLightModal';

export default function CameraScreen() {
  const router = useRouter();
  const { poseId } = useLocalSearchParams<{ poseId?: string }>();
  const [cueIndex, setCueIndex] = useState(0);
  const [cueType, setCueType] = useState<'subject' | 'photographer'>('subject');
  const burstTimerRef = useRef<NodeJS.Timeout | null>(null);

  const store = useCameraStore();
  const activePose =
    (poseId ? getPoseById(poseId) : undefined) ?? seedPoses[0];
  const cues = cueType === 'subject' ? activePose.subjectCues : activePose.photographerCues;
  const currentCue = cues[cueIndex % cues.length];

  // cleanup burst timer on unmount
  useEffect(() => {
    return () => {
      if (burstTimerRef.current) clearInterval(burstTimerRef.current);
    };
  }, []);

  const handleCapturePhoto = () => {
    const timestamp = Date.now();
    store.addCapturedPhoto(`file:///kandid_captures/shot_${timestamp}.jpg`);
  };

  const executeShutter = () => {
    if (store.shutterMode === 'single') {
      if (store.timer > 0) {
        store.setCountdown(store.timer);
        const timerInterval = setInterval(() => {
          store.setCountdown(store.countdown - 1);
        }, 1000);
        setTimeout(() => {
          clearInterval(timerInterval);
          store.setCountdown(0);
          handleCapturePhoto();
        }, store.timer * 1000);
      } else {
        handleCapturePhoto();
      }
    } else {
      // hands-free recurring interval series mode
      if (store.isCapturing) {
        if (burstTimerRef.current) clearInterval(burstTimerRef.current);
        store.setIsCapturing(false);
      } else {
        store.setIsCapturing(true);
        handleCapturePhoto();
        burstTimerRef.current = setInterval(() => {
          handleCapturePhoto();
        }, store.burstInterval * 1000);
      }
    }
  };

  return (
    <View style={styles.container}>
      {/* 1. camera feed */}
      <VisionViewfinder
        position={store.cameraPosition}
        zoomLevel={store.zoomLevel}
      />

      {/* 2. skia mannequin, grid lines & countdown overlay */}
      <CameraOverlay
        joints={activePose.skeletonJoints}
        showGrid={store.showGrid}
        countdown={store.countdown}
      />

      {/* 3. top control bar */}
      <CameraTopBar
        onClose={() => router.back()}
        flash={store.flash}
        onToggleFlash={store.toggleFlash}
        timer={store.timer}
        onToggleTimer={store.toggleTimer}
        showGrid={store.showGrid}
        onToggleGrid={store.toggleGrid}
        onOpenSoftLight={() => store.setShowSoftLight(true)}
        cueType={cueType}
        onToggleCueType={() => setCueType(prev => (prev === 'subject' ? 'photographer' : 'subject'))}
      />

      {/* 4. docked cue card in safe zone (bottom: 120px) */}
      <CueCard
        cueText={currentCue}
        cueType={cueType}
        currentStep={(cueIndex % cues.length) + 1}
        totalSteps={cues.length}
        onNextCue={() => setCueIndex(prev => (prev + 1) % cues.length)}
        onPrevCue={() => setCueIndex(prev => (prev - 1 + cues.length) % cues.length)}
        onToggleType={() => setCueType(prev => (prev === 'subject' ? 'photographer' : 'subject'))}
      />

      {/* 5. bottom shutter controls & zoom selector */}
      <ShutterBar
        zoomLevel={store.zoomLevel}
        onSelectZoom={store.setZoomLevel}
        shutterMode={store.shutterMode}
        onToggleShutterMode={store.setShutterMode}
        burstInterval={store.burstInterval}
        onSelectBurstInterval={store.setBurstInterval}
        isCapturing={store.isCapturing}
        onPressShutter={executeShutter}
        onFlipCamera={store.toggleCameraPosition}
        capturedCount={store.capturedPhotos.length}
      />

      {/* 6. soft light illumination modal */}
      <SoftLightModal
        visible={store.showSoftLight}
        onClose={() => store.setShowSoftLight(false)}
        color={store.softLightColor}
        onChangeColor={store.setSoftLightColor}
        brightness={store.softLightBrightness}
        onChangeBrightness={store.setSoftLightBrightness}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E0D0C',
  },
});
