import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Colors } from '../constants/colors';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

export default function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search caterers, cuisine, tags…',
  onClear,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🔍</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.textMuted}
        returnKeyType="search"
        autoCorrect={false}
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={onClear} style={styles.clearBtn}>
          <Text style={styles.clearIcon}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: Colors.textPrimary,
    padding: 0,
  },
  clearBtn: {
    padding: 4,
    marginLeft: 4,
  },
  clearIcon: {
    fontSize: 13,
    color: Colors.textMuted,
  },
});