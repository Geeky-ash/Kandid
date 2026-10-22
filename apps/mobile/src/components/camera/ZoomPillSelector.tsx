import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, radius, typography } from '@kandid/ui-tokens';
import { ZoomLevel } from '../../stores/cameraStore';

const ZOOM_LEVELS: ZoomLevel[] = ['0.5x', '1x', '2x', '3x'];

interface ZoomPillSelectorProps {
  zoomLevel: ZoomLevel;
  onSelectZoom: (z: ZoomLevel) => void;
}

export const ZoomPillSelector: React.FC<ZoomPillSelectorProps> = ({
  zoomLevel,
  onSelectZoom,
}) => {
  return (
    <View style={styles.zoomContainer}>
      {ZOOM_LEVELS.map(level => {
        const isActive = zoomLevel === level;
        return (
          <TouchableOpacity
            key={level}
            onPress={() => onSelectZoom(level)}
            style={[styles.zoomPill, isActive && styles.zoomPillActive]}
          >
            <Text style={[styles.zoomText, isActive && styles.zoomTextActive]}>
              {level}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  zoomContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(252, 249, 244, 0.12)',
    borderRadius: radius.pill,
    padding: 2,
    gap: 2,
  },
  zoomPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  zoomPillActive: {
    backgroundColor: colors.brand.gold,
  },
  zoomText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.labelSm,
    color: colors.text.inverse,
    fontWeight: typography.fontWeight.semibold,
  },
  zoomTextActive: {
    color: colors.text.onGold,
    fontWeight: typography.fontWeight.bold,
  },
});
