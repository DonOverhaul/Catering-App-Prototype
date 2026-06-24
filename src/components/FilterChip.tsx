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
    <TouchableOpacity style={[s.chip, isActive && s.active]} onPress={onPress} activeOpacity={0.7}>
      <Text style={[s.label, isActive && s.labelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 14, backgroundColor: Colors.background, borderWidth: 1, borderColor: Colors.border, marginRight: 6, marginBottom: 6 },
  active: { backgroundColor: Colors.primaryLight, borderColor: Colors.primary },
  label: { fontSize: 12, fontWeight: '500', color: Colors.textSecondary },
  labelActive: { color: Colors.primary, fontWeight: '600' },
});