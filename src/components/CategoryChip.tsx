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
    <TouchableOpacity style={[s.chip, isActive && s.active]} onPress={onPress} activeOpacity={0.75}>
      <Text style={[s.label, isActive && s.labelActive]}>
        {emoji ? `${emoji} ${label}` : label}
      </Text>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, backgroundColor: Colors.surface, borderWidth: 1.5, borderColor: Colors.border, marginRight: 8 },
  active: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  label: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  labelActive: { color: '#FFFFFF' },
});