import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Package } from '../types';
import { Colors } from '../constants/colors';

interface Props {
  pkg: Package;
  onPress: () => void;
}

export default function PackageCard({ pkg, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.header}>
        <Text style={styles.name}>{pkg.name}</Text>
        <View style={styles.priceBox}>
          <Text style={styles.price}>RM{pkg.price}</Text>
          <Text style={styles.priceUnit}>/{pkg.priceUnit}</Text>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {pkg.description}
      </Text>

      <Text style={styles.minPax}>Min. {pkg.minPax} pax</Text>

      <View style={styles.tags}>
        {pkg.tags.slice(0, 4).map((tag) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.suitable}>
          Suitable for: {pkg.suitableFor.slice(0, 2).join(', ')}
          {pkg.suitableFor.length > 2 ? ' +more' : ''}
        </Text>
        <TouchableOpacity style={styles.ctaBtn} onPress={onPress}>
          <Text style={styles.ctaText}>View</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  priceBox: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 17,
    fontWeight: '800',
    color: Colors.primary,
  },
  priceUnit: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  description: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 6,
  },
  minPax: {
    fontSize: 12,
    color: Colors.textMuted,
    marginBottom: 8,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 10,
  },
  tag: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  tagText: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  suitable: {
    fontSize: 11,
    color: Colors.textMuted,
    flex: 1,
  },
  ctaBtn: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  ctaText: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '700',
  },
});