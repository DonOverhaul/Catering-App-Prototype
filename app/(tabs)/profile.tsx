import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Colors } from '../../src/constants/colors';
import FilterChip from '../../src/components/FilterChip';

const PROFILE = { name: 'JK', email: 'jk@example.com', city: 'Cyberjaya', budget: 25, prefs: ['Halal', 'High Protein'] };
const ALL_PREFS = ['Halal', 'Vegetarian', 'High Protein', 'Low Calorie', 'Spicy', 'No Pork'];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={s.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={s.header}>
          <View style={s.avatar}><Text style={s.avatarText}>{PROFILE.name}</Text></View>
          <Text style={s.name}>{PROFILE.name}</Text>
          <Text style={s.email}>{PROFILE.email}</Text>
        </View>

        <View style={s.card}>
          <Text style={s.cardTitle}>My Preferences</Text>
          <View style={s.row}>
            <Text style={s.rowLabel}>📍 Preferred Location</Text>
            <Text style={s.rowVal}>{PROFILE.city}</Text>
          </View>
          <View style={[s.row, { borderBottomWidth: 0 }]}>
            <Text style={s.rowLabel}>💰 Budget per Pax</Text>
            <Text style={s.rowVal}>RM {PROFILE.budget}</Text>
          </View>
          <Text style={[s.rowLabel, { marginTop: 12 }]}>🥗 Dietary Preferences</Text>
          <View style={s.chips}>
            {ALL_PREFS.map((p) => <FilterChip key={p} label={p} isActive={PROFILE.prefs.includes(p)} />)}
          </View>
        </View>

        <View style={s.card}>
          <Text style={s.cardTitle}>About CaterMatch MY</Text>
          <Text style={s.about}>
            CaterMatch MY helps you discover food catering services, home-based cooks, and meal prep subscriptions across Malaysia. This is a prototype — real booking coming soon!
          </Text>
        </View>

        <View style={{ marginHorizontal: 20, marginBottom: 40 }}>
          <TouchableOpacity style={s.dummyBtn}>
            <Text style={s.dummyBtnText}>Edit Profile (coming soon)</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { alignItems: 'center', paddingTop: 32, paddingBottom: 24, borderBottomWidth: 1, borderBottomColor: Colors.border },
  avatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarText: { color: '#FFF', fontWeight: '800', fontSize: 22 },
  name: { fontSize: 20, fontWeight: '800', color: Colors.textPrimary, marginBottom: 4 },
  email: { fontSize: 14, color: Colors.textSecondary },
  card: { margin: 20, marginBottom: 0, backgroundColor: Colors.surface, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: Colors.border },
  cardTitle: { fontSize: 16, fontWeight: '700', color: Colors.textPrimary, marginBottom: 14 },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.border },
  rowLabel: { fontSize: 14, color: Colors.textSecondary },
  rowVal: { fontSize: 14, fontWeight: '600', color: Colors.textPrimary },
  chips: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
  about: { fontSize: 14, color: Colors.textSecondary, lineHeight: 20 },
  dummyBtn: { backgroundColor: Colors.primaryLight, borderRadius: 10, padding: 14, alignItems: 'center', marginTop: 20 },
  dummyBtnText: { fontSize: 14, fontWeight: '600', color: Colors.primary },
});