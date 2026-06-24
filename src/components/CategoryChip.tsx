import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

interface Props {
  label: string;
  emoji?: string;
  isActive?: boolean;
  onPress?: () => void;
}

export default function CategoryChip({ label, emoji, isActive = false, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.chip, isActive && styles.chipActive]}
      onPress={onPress}
      activeOpacity={0.75}
    >
      {emoji ? (
        <Text style={styles.label}>
          {emoji} {label}
        </Text>
      ) : (
        <Text style={[styles.label, isActive && styles.labelActive]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    borderWidth: 1.5,
    borderColor: Colors.border,
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  labelActive: {
    color: '#FFFFFF',
  },
});