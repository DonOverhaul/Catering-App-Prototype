import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Vendor } from '../types';
import { Colors } from '../constants/colors';

interface Props {
  vendor: Vendor;
  onPress: () => void;
  isFavourite?: boolean;
  onToggleFavourite?: () => void;
}

export default function VendorCard({ vendor, onPress, isFavourite, onToggleFavourite }: Props) {
  const spicyLabels: Record<string, string> = { mild: '🌶️ Mild', medium: '🌶️🌶️ Medium', hot: '🌶️🌶️🌶️ Hot', 'extra-hot': '🌶️🌶️🌶️🌶️ Extra Hot' };

  return (
    <TouchableOpacity style={s.card} onPress={onPress} activeOpacity={0.88}>
      <View style={s.imgBox}>
        <Text style={s.emoji}>{vendor.imagePlaceholder}</Text>
        {vendor.isHalalFriendly && (
          <View style={s.halalBadge}><Text style={s.halalText}>HALAL</Text></View>
        )}
        {onToggleFavourite && (
          <TouchableOpacity style={s.heart} onPress={onToggleFavourite}>
            <Text style={{ fontSize: 22 }}>{isFavourite ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={s.body}>
        <View style={s.row}>
          <Text style={s.name} numberOfLines={1}>{vendor.name}</Text>
          <View style={s.ratingRow}>
            <Text style={s.star}>⭐</Text>
            <Text style={s.rating}>{vendor.rating.toFixed(1)}</Text>
            <Text style={s.reviewCount}> ({vendor.reviewCount})</Text>
          </View>
        </View>

        <Text style={s.city}>📍 {vendor.city}</Text>

        {vendor.spicyLevel !== 'none' && (
          <View style={s.spicyBadge}>
            <Text style={s.spicyText}>{spicyLabels[vendor.spicyLevel]}</Text>
          </View>
        )}

        <View style={s.tags}>
          {vendor.tags.slice(0, 3).map((t) => (
            <View key={t} style={s.tag}><Text style={s.tagText}>{t}</Text></View>
          ))}
        </View>

        <Text style={s.price}>From RM{vendor.priceRange.min} – RM{vendor.priceRange.max} / pax</Text>
      </View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: Colors.surface, borderRadius: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 8, elevation: 3, overflow: 'hidden' },
  imgBox: { height: 140, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 56 },
  halalBadge: { position: 'absolute', top: 10, left: 10, backgroundColor: Colors.halalGreen, borderRadius: 6, paddingHorizontal: 8, paddingVertical: 3 },
  halalText: { fontSize: 10, fontWeight: '700', color: Colors.halalGreenText, letterSpacing: 0.5 },
  heart: { position: 'absolute', top: 8, right: 10 },
  body: { padding: 14 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  name: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, flex: 1, marginRight: 8 },
  ratingRow: { flexDirection: 'row', alignItems: 'center' },
  star: { fontSize: 12 },
  rating: { fontSize: 13, fontWeight: '700', color: Colors.textPrimary },
  reviewCount: { fontSize: 11, color: Colors.textMuted },
  city: { fontSize: 13, color: Colors.textSecondary, marginBottom: 6 },
  spicyBadge: { alignSelf: 'flex-start', backgroundColor: Colors.spicyRed, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, marginBottom: 6 },
  spicyText: { fontSize: 11, color: Colors.spicyRedText, fontWeight: '600' },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginBottom: 8 },
  tag: { backgroundColor: Colors.primaryLight, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  tagText: { fontSize: 11, color: Colors.primary, fontWeight: '600' },
  price: { fontSize: 13, color: Colors.textSecondary, fontWeight: '500' },
});