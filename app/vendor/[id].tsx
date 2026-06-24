import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, Linking, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { MOCK_VENDORS } from '../../src/data/vendors';
import { useFavourites } from '../../src/hooks/useFavourites';
import PackageCard from '../../src/components/PackageCard';
import SectionHeader from '../../src/components/SectionHeader';

export default function VendorDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isFavourite, toggleFavourite } = useFavourites();
  const vendor = MOCK_VENDORS.find((v) => v.id === id);

  if (!vendor) return (
    <SafeAreaView style={s.safe}>
      <View style={s.center}><Text style={s.muted}>Vendor not found.</Text></View>
    </SafeAreaView>
  );

  const openWhatsApp = () => {
    const msg = encodeURIComponent(`Hi! I found your service on CaterMatch MY and I'd like to enquire about "${vendor.name}".`);
    Linking.openURL(`https://wa.me/601234567890?text=${msg}`).catch(() =>
      Alert.alert('WhatsApp not installed', 'Please install WhatsApp to contact the vendor.')
    );
  };

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Image placeholder */}
        <View style={s.imgBox}>
          <Text style={{ fontSize: 72 }}>{vendor.imagePlaceholder}</Text>
          <TouchableOpacity style={s.heart} onPress={() => toggleFavourite(vendor.id)}>
            <Text style={{ fontSize: 28 }}>{isFavourite(vendor.id) ? '❤️' : '🤍'}</Text>
          </TouchableOpacity>
          {vendor.isHalalFriendly && (
            <View style={s.halalBadge}><Text style={s.halalText}>HALAL</Text></View>
          )}
        </View>

        <View style={s.content}>
          {/* Name + rating */}
          <View style={s.row}>
            <Text style={s.name}>{vendor.name}</Text>
            <View style={s.ratingBox}>
              <Text style={{ fontSize: 14 }}>⭐</Text>
              <Text style={s.rating}> {vendor.rating.toFixed(1)}</Text>
            </View>
          </View>
          <Text style={s.reviews}>{vendor.reviewCount} reviews</Text>
          <Text style={s.city}>📍 {vendor.city}</Text>

          {/* Tags */}
          <View style={s.tags}>
            {vendor.tags.map((t) => <View key={t} style={s.tag}><Text style={s.tagText}>{t}</Text></View>)}
          </View>

          {/* About */}
          <Text style={s.sectionLabel}>About</Text>
          <Text style={s.desc}>{vendor.description}</Text>

          {/* Details table */}
          <Text style={s.sectionLabel}>Details</Text>
          <View style={s.detailCard}>
            {[
              ['City', vendor.city],
              ['Delivery areas', vendor.deliveryAreas.join(', ')],
              ['Min. order', `${vendor.minOrderPax} pax`],
              ['Price range', `RM${vendor.priceRange.min} – RM${vendor.priceRange.max} / pax`],
              ['Spicy level', vendor.spicyLevel === 'none' ? 'Not spicy' : vendor.spicyLevel],
              ['Cuisines', vendor.cuisineTypes.join(', ')],
            ].map(([label, value]) => (
              <View key={label} style={s.detailRow}>
                <Text style={s.detailLabel}>{label}</Text>
                <Text style={s.detailValue}>{value}</Text>
              </View>
            ))}
          </View>

          {/* Packages */}
          <SectionHeader title="Available Packages" />
          {vendor.packages.map((p) => (
            <PackageCard key={p.id} pkg={p} onPress={() => router.push(`/package/${p.id}`)} />
          ))}

          {/* Buttons */}
          <TouchableOpacity style={s.primaryBtn} onPress={() => router.push(`/quote/${vendor.id}`)}>
            <Text style={s.primaryBtnText}>📋 Request Quote</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.secondaryBtn} onPress={openWhatsApp}>
            <Text style={s.secondaryBtnText}>💬 Contact via WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  muted: { fontSize: 16, color: Colors.textSecondary },
  imgBox: { height: 200, backgroundColor: Colors.primaryLight, alignItems: 'center', justifyContent: 'center' },
  heart: { position: 'absolute', top: 14, right: 16 },
  halalBadge: { position: 'absolute', top: 14, left: 16, backgroundColor: Colors.halalGreen, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  halalText: { fontSize: 11, fontWeight: '700', color: Colors.halalGreenText, letterSpacing: 0.5 },
  content: { padding: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 22, fontWeight: '800', color: Colors.textPrimary, flex: 1, marginRight: 8 },
  ratingBox: { flexDirection: 'row', alignItems: 'center' },
  rating: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary },
  reviews: { fontSize: 12, color: Colors.textMuted, marginBottom: 6, marginTop: 2 },
  city: { fontSize: 14, color: Colors.textSecondary, marginBottom: 12 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 20 },
  tag: { backgroundColor: Colors.primaryLight, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  tagText: { fontSize: 12, color: Colors.primary, fontWeight: '600' },
  sectionLabel: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginBottom: 10, marginTop: 4 },
  desc: { fontSize: 14, color: Colors.textSecondary, lineHeight: 22, marginBottom: 20 },
  detailCard: { backgroundColor: Colors.surface, borderRadius: 12, padding: 12, borderWidth: 1, borderColor: Colors.border, marginBottom: 20 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: Colors.border },
  detailLabel: { fontSize: 13, color: Colors.textSecondary, flex: 1 },
  detailValue: { fontSize: 13, color: Colors.textPrimary, fontWeight: '500', flex: 1.5, textAlign: 'right' },
  primaryBtn: { backgroundColor: Colors.primary, borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginBottom: 12 },
  primaryBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  secondaryBtn: { backgroundColor: Colors.surface, borderRadius: 14, paddingVertical: 16, alignItems: 'center', borderWidth: 1.5, borderColor: Colors.border, marginBottom: 20 },
  secondaryBtnText: { color: Colors.textPrimary, fontSize: 16, fontWeight: '600' },
});