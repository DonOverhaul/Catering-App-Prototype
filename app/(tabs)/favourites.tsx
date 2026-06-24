import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { MOCK_VENDORS } from '../../src/data/vendors';
import { useFavourites } from '../../src/hooks/useFavourites';
import VendorCard from '../../src/components/VendorCard';

export default function FavouritesScreen() {
  const router = useRouter();
  const { favouriteIds, isFavourite, toggleFavourite } = useFavourites();
  const saved = MOCK_VENDORS.filter((v) => favouriteIds.includes(v.id));

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={s.header}>
          <Text style={s.title}>Saved ❤️</Text>
          <Text style={s.sub}>{saved.length === 0 ? 'No vendors saved yet' : `${saved.length} vendor${saved.length !== 1 ? 's' : ''} saved`}</Text>
        </View>
        <View style={s.content}>
          {saved.length === 0 ? (
            <View style={s.empty}>
              <Text style={{ fontSize: 56, marginBottom: 16 }}>🤍</Text>
              <Text style={s.emptyTitle}>Nothing saved yet</Text>
              <Text style={s.emptySub}>Tap the heart icon on any vendor to save them here</Text>
            </View>
          ) : saved.map((v) => (
            <VendorCard key={v.id} vendor={v} isFavourite={isFavourite(v.id)}
              onPress={() => router.push(`/vendor/${v.id}`)}
              onToggleFavourite={() => toggleFavourite(v.id)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { padding: 20, paddingBottom: 4 },
  title: { fontSize: 26, fontWeight: '800', color: Colors.textPrimary, letterSpacing: -0.5, marginBottom: 4 },
  sub: { fontSize: 14, color: Colors.textSecondary },
  content: { padding: 20, paddingTop: 16 },
  empty: { alignItems: 'center', paddingTop: 60 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: Colors.textPrimary, marginBottom: 8 },
  emptySub: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center', lineHeight: 20, paddingHorizontal: 20 },
});