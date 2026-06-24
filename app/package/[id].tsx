import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { MOCK_VENDORS } from '../../src/data/vendors';

export default function PackageDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const pkg = MOCK_VENDORS.flatMap((v) => v.packages).find((p) => p.id === id);
  const vendor = MOCK_VENDORS.find((v) => v.id === pkg?.vendorId);

  if (!pkg || !vendor) return (
    <SafeAreaView style={s.safe}>
      <View style={s.center}><Text style={{ color: Colors.textSecondary }}>Package not found.</Text></View>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={s.hero}>
          <Text style={s.vendorName}>{vendor.name}</Text>
          <Text style={s.pkgName}>{pkg.name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={s.price}>RM {pkg.price}</Text>
            <Text style={s.priceUnit}> / {pkg.priceUnit}</Text>
          </View>
        </View>

        <View style={s.content}>
          <Text style={s.desc}>{pkg.description}</Text>

          <View style={s.infoBox}>
            <Text style={{ fontSize: 14, color: Colors.textSecondary }}>Minimum Order</Text>
            <Text style={{ fontSize: 14, fontWeight: '700', color: Colors.textPrimary }}>{pkg.minPax} pax</Text>
          </View>

          <Text style={s.sectionTitle}>Tags</Text>
          <View style={s.tags}>
            {pkg.tags.map((t) => <View key={t} style={s.tag}><Text style={s.tagText}>{t}</Text></View>)}
          </View>

          <Text style={s.sectionTitle}>What's Included</Text>
          <View style={s.menuCard}>
            {pkg.menuItems.map((item, i) => (
              <View key={i} style={{ flexDirection: 'row', marginBottom: 8 }}>
                <Text style={{ color: Colors.primary, fontWeight: '700', marginRight: 8 }}>•</Text>
                <Text style={{ fontSize: 14, color: Colors.textSecondary, flex: 1, lineHeight: 20 }}>{item}</Text>
              </View>
            ))}
          </View>

          <Text style={s.sectionTitle}>Suitable For</Text>
          <View style={s.tags}>
            {pkg.suitableFor.map((sf) => (
              <View key={sf} style={s.greenTag}><Text style={s.greenTagText}>{sf}</Text></View>
            ))}
          </View>

          <TouchableOpacity style={s.primaryBtn} onPress={() => router.push(`/quote/${vendor.id}`)}>
            <Text style={s.primaryBtnText}>📋 Request Quote</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.outlineBtn} onPress={() => router.push(`/vendor/${vendor.id}`)}>
            <Text style={s.outlineBtnText}>View Vendor Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  hero: { backgroundColor: Colors.primary, padding: 24, paddingBottom: 28 },
  vendorName: { fontSize: 13, color: 'rgba(255,255,255,0.75)', marginBottom: 4 },
  pkgName: { fontSize: 22, fontWeight: '800', color: '#FFF', marginBottom: 12 },
  price: { fontSize: 30, fontWeight: '800', color: '#FFF' },
  priceUnit: { fontSize: 14, color: 'rgba(255,255,255,0.75)' },
  content: { padding: 20 },
  desc: { fontSize: 15, color: Colors.textSecondary, lineHeight: 22, marginBottom: 16 },
  infoBox: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Colors.surface, borderRadius: 10, padding: 14, marginBottom: 20, borderWidth: 1, borderColor: Colors.border },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary, marginBottom: 10, marginTop: 4 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 20 },
  tag: { backgroundColor: Colors.primaryLight, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  tagText: { fontSize: 12, color: Colors.primary, fontWeight: '600' },
  greenTag: { backgroundColor: Colors.veggieGreen, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  greenTagText: { fontSize: 12, color: Colors.veggieGreenText, fontWeight: '600' },
  menuCard: { backgroundColor: Colors.surface, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: Colors.border, marginBottom: 20 },
  primaryBtn: { backgroundColor: Colors.primary, borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginBottom: 12 },
  primaryBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  outlineBtn: { backgroundColor: Colors.surface, borderRadius: 14, paddingVertical: 16, alignItems: 'center', borderWidth: 1.5, borderColor: Colors.border, marginBottom: 20 },
  outlineBtnText: { color: Colors.textSecondary, fontSize: 15, fontWeight: '600' },
});