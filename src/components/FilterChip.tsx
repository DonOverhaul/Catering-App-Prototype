import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

interface Props {
  label: string;
  isActive?: boolean;
  onPress?: () => void;
}

export default function FilterChip({ label, isActive = false, onPress }: Props) {
  return (
    <TouchableOpacity
      style={[styles.chip, isActive && styles.chipActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.label, isActive && styles.labelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: 6,
    marginBottom: 6,
  },
  chipActive: {
    backgroundColor: Colors.primaryLight,
    borderColor: Colors.primary,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  labelActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
});