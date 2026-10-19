import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, radius, space, typography } from '@kandid/ui-tokens';

export interface PillButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: string;
}

export const PillButton: React.FC<PillButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
  textStyle,
  icon,
}) => {
  const getContainerStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primaryContainer;
      case 'secondary':
        return styles.secondaryContainer;
      case 'ghost':
        return styles.ghostContainer;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primaryText;
      case 'secondary':
        return styles.secondaryText;
      case 'ghost':
        return styles.ghostText;
    }
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.baseContainer, getContainerStyle(), disabled && styles.disabledContainer, style]}
    >
      {icon ? <Text style={[styles.icon, getTextStyle()]}>{icon} </Text> : null}
      <Text style={[styles.baseText, getTextStyle(), disabled && styles.disabledText, textStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    height: 48,
    paddingHorizontal: space.lg,
    borderRadius: radius.pill,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  primaryContainer: {
    backgroundColor: colors.brand.gold,
    shadowColor: colors.brand.goldDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },
  secondaryContainer: {
    backgroundColor: colors.background.surface,
    borderWidth: 1,
    borderColor: colors.border.subtle,
  },
  ghostContainer: {
    backgroundColor: 'transparent',
  },
  disabledContainer: {
    opacity: 0.45,
  },
  baseText: {
    fontFamily: typography.fontFamilies.body,
    fontSize: typography.fontSize.labelLg,
    fontWeight: typography.fontWeight.semibold,
    letterSpacing: typography.letterSpacing.normal,
  },
  primaryText: {
    color: colors.text.onGold, // espresso text strictly required on gold fill per WCAG AA
  },
  secondaryText: {
    color: colors.text.primary,
  },
  ghostText: {
    color: colors.text.secondary,
  },
  disabledText: {
    color: colors.text.tertiary,
  },
  icon: {
    fontSize: 16,
    marginRight: 4,
  },
});
