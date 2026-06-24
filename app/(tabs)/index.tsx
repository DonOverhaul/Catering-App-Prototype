import React, { useState, useMemo } from 'react';
import { ScrollView, View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { MOCK_VENDORS } from '../../src/data/vendors';
import { useFavourites } from '../../src/hooks/useFavourites';
import SearchBar from '../../src/components/SearchBar';
import CategoryChip from '../../src/components/CategoryChip';
import VendorCard from '../../src/components/VendorCard';
import PackageCard from '../../src/components/PackageCard';
import SectionHeader from '../../src/components/SectionHeader';

const CATEGORIES = [
  { label: 'Event Catering', emoji: '🎪' },
  { label: 'Meal Prep', emoji: '📦' },
  { label: 'Home Cook', emoji: '🍳' },
  { label: 'Healthy', emoji: '🥗' },
  { label: 'Spicy', emoji: '🌶️' },
  { label: 'Halal', emoji: '✅' },
  { label: 'Vegetarian', emoji: '🌿' },
];

export default function HomeScreen() {
  const router = useRouter();
  const { isFavourite, toggleFavourite } = useFavourites();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const featured = useMemo(() => MOCK_VENDORS.filter((v) => v.rating >= 4.7).slice(0, 4), []);
  const packages = useMemo(() => MOCK_VENDORS.flatMap((v) => v.packages).slice(0, 4), []);

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={s.header}>
          <View>
            <Text style={s.greeting}>Good day! 👋</Text>
            <Text style={s.sub}>What are you planning to eat?</Text>
          </View>
          <View style={s.avatar}><Text style={s.avatarText}>JK</Text></View>
        </View>

        {/* Search */}
        <View style={{ paddingHorizontal: 20, marginBottom: 12 }}>
          <SearchBar value={search} onChangeText={setSearch} onClear={() => setSearch('')} />
        </View>

        {/* Category chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }} contentContainerStyle={{ paddingHorizontal: 20 }}>
          {CATEGORIES.map((c) => (
            <CategoryChip
              key={c.label} label={c.label} emoji={c.emoji}
              isActive={activeCategory === c.label}
              onPress={() => setActiveCategory(activeCategory === c.label ? null : c.label)}
            />
          ))}
        </ScrollView>

        {/* Hero banner */}
        <TouchableOpacity style={s.banner} onPress={() => router.push('/explore')} activeOpacity={0.85}>
          <Text style={{ fontSize: 40, marginRight: 14 }}>🍽️</Text>
          <View style={{ flex: 1 }}>
            <Text style={s.bannerTitle}>Find your perfect caterer</Text>
            <Text style={s.bannerSub}>10+ vendors · Halal options available</Text>
          </View>
        </TouchableOpacity>

        {/* Featured vendors */}
        <View style={s.section}>
          <SectionHeader title="⭐ Featured Vendors" actionLabel="See all" onAction={() => router.push('/explore')} />
          {featured.map((v) => (
            <VendorCard key={v.id} vendor={v} isFavourite={isFavourite(v.id)}
              onPress={() => router.push(`/vendor/${v.id}`)}
              onToggleFavourite={() => toggleFavourite(v.id)}
            />
          ))}
        </View>

        {/* Packages */}
        <View style={s.section}>
          <SectionHeader title="📦 Recommended Packages" actionLabel="Browse" onAction={() => router.push('/explore')} />
          {packages.map((p) => (
            <PackageCard key={p.id} pkg={p} onPress={() => router.push(`/package/${p.id}`)} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 12 },
  greeting: { fontSize: 22, fontWeight: '800', color: Colors.textPrimary, letterSpacing: -0.5 },
  sub: { fontSize: 14, color: Colors.textSecondary, marginTop: 2 },
  avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#FFF', fontWeight: '700', fontSize: 14 },
  banner: { marginHorizontal: 20, marginBottom: 24, backgroundColor: Colors.primary, borderRadius: 16, padding: 18, flexDirection: 'row', alignItems: 'center' },
  bannerTitle: { fontSize: 16, fontWeight: '800', color: '#FFF', marginBottom: 4 },
  bannerSub: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },
  section: { paddingHorizontal: 20, marginBottom: 8 },
});