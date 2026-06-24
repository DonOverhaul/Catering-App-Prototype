import React, { useState, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { MOCK_VENDORS } from '../../src/data/vendors';
import { useFavourites } from '../../src/hooks/useFavourites';
import { CuisineType } from '../../src/types';
import SearchBar from '../../src/components/SearchBar';
import FilterChip from '../../src/components/FilterChip';
import VendorCard from '../../src/components/VendorCard';
import SectionHeader from '../../src/components/SectionHeader';

const CITIES = ['Kuala Lumpur', 'Petaling Jaya', 'Subang Jaya', 'Shah Alam', 'Klang', 'Cyberjaya', 'Ampang'];
const DIETARY = ['Halal', 'Vegetarian', 'High Protein', 'Low Calorie', 'Spicy', 'Meal Prep'];
const CUISINES: CuisineType[] = ['Malay', 'Chinese', 'Indian', 'Western', 'Mexican', 'Japanese', 'Healthy', 'Dessert'];
const SORTS = [{ label: 'Top Rated', value: 'rating' }, { label: 'Lowest Price', value: 'price' }, { label: 'Most Popular', value: 'popularity' }] as const;

export default function ExploreScreen() {
  const router = useRouter();
  const { isFavourite, toggleFavourite } = useFavourites();
  const [query, setQuery] = useState('');
  const [city, setCity] = useState<string | null>(null);
  const [cuisine, setCuisine] = useState<CuisineType | null>(null);
  const [dietary, setDietary] = useState<string[]>([]);
  const [halalOnly, setHalalOnly] = useState(false);
  const [sort, setSort] = useState<'rating' | 'price' | 'popularity'>('rating');

  const toggleDietary = (tag: string) =>
    setDietary((p) => p.includes(tag) ? p.filter((x) => x !== tag) : [...p, tag]);

  const results = useMemo(() => {
    let r = [...MOCK_VENDORS];
    if (query.trim()) {
      const q = query.toLowerCase();
      r = r.filter((v) =>
        v.name.toLowerCase().includes(q) ||
        v.tags.some((t) => t.toLowerCase().includes(q)) ||
        v.cuisineTypes.some((c) => c.toLowerCase().includes(q)) ||
        v.city.toLowerCase().includes(q)
      );
    }
    if (city) r = r.filter((v) => v.city === city || v.deliveryAreas.includes(city));
    if (halalOnly) r = r.filter((v) => v.isHalalFriendly);
    if (cuisine) r = r.filter((v) => v.cuisineTypes.includes(cuisine));
    if (dietary.length) r = r.filter((v) => dietary.some((d) => v.tags.some((t) => t.toLowerCase().includes(d.toLowerCase()))));
    if (sort === 'rating') r.sort((a, b) => b.rating - a.rating);
    else if (sort === 'price') r.sort((a, b) => a.priceRange.min - b.priceRange.min);
    else r.sort((a, b) => b.reviewCount - a.reviewCount);
    return r;
  }, [query, city, halalOnly, cuisine, dietary, sort]);

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={s.header}>
          <Text style={s.title}>Explore Caterers</Text>
          <SearchBar value={query} onChangeText={setQuery} onClear={() => setQuery('')} />
        </View>

        {/* Sort */}
        <View style={s.filterBlock}>
          <Text style={s.filterLabel}>SORT BY</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={s.chipRow}>
              {SORTS.map((opt) => <FilterChip key={opt.value} label={opt.label} isActive={sort === opt.value} onPress={() => setSort(opt.value)} />)}
            </View>
          </ScrollView>
        </View>

        {/* City */}
        <View style={s.filterBlock}>
          <Text style={s.filterLabel}>LOCATION</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={s.chipRow}>
              {CITIES.map((c) => <FilterChip key={c} label={c} isActive={city === c} onPress={() => setCity(city === c ? null : c)} />)}
            </View>
          </ScrollView>
        </View>

        {/* Cuisine */}
        <View style={s.filterBlock}>
          <Text style={s.filterLabel}>CUISINE</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={s.chipRow}>
              {CUISINES.map((c) => <FilterChip key={c} label={c} isActive={cuisine === c} onPress={() => setCuisine(cuisine === c ? null : c)} />)}
            </View>
          </ScrollView>
        </View>

        {/* Dietary */}
        <View style={s.filterBlock}>
          <Text style={s.filterLabel}>DIETARY / TYPE</Text>
          <View style={s.chipWrap}>
            <FilterChip label="Halal Only" isActive={halalOnly} onPress={() => setHalalOnly(!halalOnly)} />
            {DIETARY.map((d) => <FilterChip key={d} label={d} isActive={dietary.includes(d)} onPress={() => toggleDietary(d)} />)}
          </View>
        </View>

        {/* Results */}
        <View style={s.results}>
          <SectionHeader title={`${results.length} vendor${results.length !== 1 ? 's' : ''} found`} />
          {results.length === 0 ? (
            <View style={s.empty}>
              <Text style={{ fontSize: 48, marginBottom: 12 }}>🔍</Text>
              <Text style={s.emptyTitle}>No vendors found</Text>
              <Text style={s.emptySub}>Try adjusting your filters or search term</Text>
            </View>
          ) : results.map((v) => (
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
  header: { padding: 20, paddingBottom: 12 },
  title: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary, letterSpacing: -0.5, marginBottom: 12 },
  filterBlock: { paddingLeft: 20, marginBottom: 10 },
  filterLabel: { fontSize: 11, fontWeight: '700', color: Colors.textMuted, letterSpacing: 0.8, marginBottom: 6 },
  chipRow: { flexDirection: 'row', paddingRight: 20 },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', paddingRight: 20 },
  results: { padding: 20, paddingTop: 12 },
  empty: { alignItems: 'center', paddingVertical: 40 },
  emptyTitle: { fontSize: 17, fontWeight: '700', color: Colors.textPrimary, marginBottom: 6 },
  emptySub: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center' },
});