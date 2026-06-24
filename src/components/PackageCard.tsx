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
    <TouchableOpacity style={s.card} onPress={onPress} activeOpacity={0.88}>
      <View style={s.header}>
        <Text style={s.name}>{pkg.name}</Text>
        <View>
          <Text style={s.price}>RM{pkg.price}</Text>
          <Text style={s.unit}>/{pkg.priceUnit}</Text>
        </View>
      </View>
      <Text style={s.desc} numberOfLines={2}>{pkg.description}</Text>
      <Text style={s.minPax}>Min. {pkg.minPax} pax</Text>
      <View style={s.tags}>
        {pkg.tags.slice(0, 4).map((t) => (
          <View key={t} style={s.tag}><Text style={s.tagText}>{t}</Text></View>
        ))}
      </View>
      <View style={s.footer}>
        <Text style={s.suitable} numberOfLines={1}>
          For: {pkg.suitableFor.slice(0, 2).join(', ')}{pkg.suitableFor.length > 2 ? ' +more' : ''}
        </Text>
        <TouchableOpacity style={s.btn} onPress={onPress}>
          <Text style={s.btnText}>View</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  card: { backgroundColor: Colors.surface, borderRadius: 14, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: Colors.border },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 },
  name: { fontSize: 15, fontWeight: '700', color: Colors.textPrimary, flex: 1, marginRight: 8 },
  price: { fontSize: 17, fontWeight: '800', color: Colors.primary, textAlign: 'right' },
  unit: { fontSize: 10, color: Colors.textMuted, textAlign: 'right' },
  desc: { fontSize: 13, color: Colors.textSecondary, lineHeight: 18, marginBottom: 6 },
  minPax: { fontSize: 12, color: Colors.textMuted, marginBottom: 8 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 4, marginBottom: 10 },
  tag: { backgroundColor: Colors.primaryLight, borderRadius: 6, paddingHorizontal: 7, paddingVertical: 2 },
  tagText: { fontSize: 11, color: Colors.primary, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  suitable: { fontSize: 11, color: Colors.textMuted, flex: 1 },
  btn: { backgroundColor: Colors.primaryLight, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 5 },
  btnText: { fontSize: 13, color: Colors.primary, fontWeight: '700' },
});