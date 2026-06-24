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

function SpicyBadge({ level }: { level: Vendor['spicyLevel'] }) {
  if (level === 'none') return null;
  const labels: Record<string, string> = {
    mild: '🌶️ Mild',
    medium: '🌶️🌶️ Medium',
    hot: '🌶️🌶️🌶️ Hot',
    'extra-hot': '🌶️🌶️🌶️🌶️ Extra Hot',
  };
  return (
    <View style={badgeStyles.spicy}>
      <Text style={badgeStyles.spicyText}>{labels[level]}</Text>
    </View>
  );
}

export default function VendorCard({ vendor, onPress, isFavourite, onToggleFavourite }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      {/* Image placeholder */}
      <View style={styles.imagePlaceholder}>
        <Text style={styles.emoji}>{vendor.imagePlaceholder}</Text>
        {vendor.isHalalFriendly && (
          <View style={styles.halalBadge}>
            <Text style={styles.halalText}>HALAL</Text>
          </View>
        )}
        {onToggleFavourite && (
          <TouchableOpacity style={styles.heartBtn} onPress={onToggleFavourite}>
            <Text style={styles.heartIcon}>{isFavourite ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            {vendor.name}
          </Text>
          <View style={styles.ratingRow}>
            <Text style={styles.star}>⭐</Text>
            <Text style={styles.rating}>{vendor.rating.toFixed(1)}</Text>
            <Text style={styles.reviewCount}>({vendor.reviewCount})</Text>
          </View>
        </View>

        <Text style={styles.city}>📍 {vendor.city}</Text>

        <SpicyBadge level={vendor.spicyLevel} />

        {/* Tags */}
        <View style={styles.tags}>
          {vendor.tags.slice(0, 3).map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* Price range */}
        <Text style={styles.price}>
          From RM{vendor.priceRange.min} – RM{vendor.priceRange.max} / pax
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    height: 140,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 56,
  },
  halalBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: Colors.halalGreen,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  halalText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.halalGreenText,
    letterSpacing: 0.5,
  },
  heartBtn: {
    position: 'absolute',
    top: 8,
    right: 10,
    padding: 4,
  },
  heartIcon: {
    fontSize: 22,
  },
  content: {
    padding: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 12,
    marginRight: 2,
  },
  rating: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  reviewCount: {
    fontSize: 11,
    color: Colors.textMuted,
    marginLeft: 2,
  },
  city: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 6,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
    marginBottom: 8,
    gap: 4,
  },
  tag: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  tagText: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '600',
  },
  price: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
});

const badgeStyles = StyleSheet.create({
  spicy: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.spicyRed,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 4,
  },
  spicyText: {
    fontSize: 11,
    color: Colors.spicyRedText,
    fontWeight: '600',
  },
});