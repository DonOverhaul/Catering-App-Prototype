import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../src/constants/colors';
import { MOCK_VENDORS } from '../../src/data/vendors';

const EVENT_TYPES = ['Wedding', 'Birthday', 'Corporate', 'Family Gathering', 'Meal Prep', 'Office Lunch', 'Casual Dinner', 'Other'];

interface Form { name: string; phone: string; eventType: string; date: string; pax: string; budget: string; location: string; dietary: string; notes: string; }

export default function QuoteScreen() {
  const { vendorId } = useLocalSearchParams<{ vendorId: string }>();
  const router = useRouter();
  const vendor = MOCK_VENDORS.find((v) => v.id === vendorId);
  const [form, setForm] = useState<Form>({ name: '', phone: '', eventType: '', date: '', pax: '', budget: '', location: '', dietary: '', notes: '' });
  const [done, setDone] = useState(false);

  const set = (k: keyof Form) => (v: string) => setForm((p) => ({ ...p, [k]: v }));

  const submit = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.pax.trim()) {
      Alert.alert('Missing info', 'Please fill in your name, phone, and number of pax.');
      return;
    }
    setDone(true);
  };

  if (done) {
    return (
      <SafeAreaView style={s.safe}>
        <ScrollView contentContainerStyle={s.successWrap}>
          <Text style={{ fontSize: 64, marginBottom: 16 }}>✅</Text>
          <Text style={s.successTitle}>Quote Request Sent!</Text>
          <Text style={s.successBody}>
            Your request has been submitted to {vendor?.name ?? 'the vendor'}.{'\n\n'}
            In a real app, the vendor would be notified and contact you within 24 hours.
          </Text>
          <View style={s.summaryBox}>
            {[['Name', form.name], ['Phone', form.phone], ['Event', form.eventType || '—'], ['Date', form.date || '—'], ['Pax', form.pax], ['Budget/pax', form.budget ? `RM ${form.budget}` : '—'], ['Location', form.location || '—']].map(([l, v]) => (
              <View key={l} style={s.summaryRow}>
                <Text style={s.summaryLabel}>{l}</Text>
                <Text style={s.summaryVal}>{v}</Text>
              </View>
            ))}
          </View>
          <TouchableOpacity style={s.primaryBtn} onPress={() => router.back()}>
            <Text style={s.primaryBtnText}>Back to Vendor</Text>
          </TouchableOpacity>
          <TouchableOpacity style={s.outlineBtn} onPress={() => router.push('/')}>
            <Text style={s.outlineBtnText}>Go to Home</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.safe}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={s.header}>
            <Text style={s.title}>Request a Quote</Text>
            {vendor && <Text style={s.vendorName}>For: {vendor.name}</Text>}
          </View>

          <View style={s.form}>
            <Field label="Your Name *" placeholder="e.g. Ahmad bin Razak" value={form.name} onChange={set('name')} />
            <Field label="Phone Number *" placeholder="e.g. 012-3456789" value={form.phone} onChange={set('phone')} keyboard="phone-pad" />

            <Text style={s.fieldLabel}>Event Type</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                {EVENT_TYPES.map((t) => (
                  <TouchableOpacity key={t} style={[s.chip, form.eventType === t && s.chipActive]} onPress={() => set('eventType')(t)}>
                    <Text style={[s.chipText, form.eventType === t && s.chipTextActive]}>{t}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <Field label="Date Needed" placeholder="e.g. 15 August 2025" value={form.date} onChange={set('date')} />
            <Field label="Number of Pax *" placeholder="e.g. 50" value={form.pax} onChange={set('pax')} keyboard="number-pad" />
            <Field label="Budget per Pax (RM)" placeholder="e.g. 25" value={form.budget} onChange={set('budget')} keyboard="number-pad" />
            <Field label="Event Location" placeholder="e.g. Cyberjaya, Selangor" value={form.location} onChange={set('location')} />
            <Field label="Dietary Requirements" placeholder="e.g. Halal, no nuts, vegetarian option" value={form.dietary} onChange={set('dietary')} />
            <Field label="Additional Notes" placeholder="Any special requests…" value={form.notes} onChange={set('notes')} multiline />

            <Text style={s.disclaimer}>
              * This is a prototype. No real quote will be sent. In a live version, the vendor will receive this request and contact you.
            </Text>
            <TouchableOpacity style={s.primaryBtn} onPress={submit}>
              <Text style={s.primaryBtnText}>Submit Request</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function Field({ label, placeholder, value, onChange, keyboard = 'default', multiline = false }:
  { label: string; placeholder: string; value: string; onChange: (v: string) => void; keyboard?: 'default' | 'phone-pad' | 'number-pad'; multiline?: boolean }) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={s.fieldLabel}>{label}</Text>
      <TextInput
        style={[s.input, multiline && { height: 100, textAlignVertical: 'top' }]}
        placeholder={placeholder}
        placeholderTextColor={Colors.textMuted}
        value={value}
        onChangeText={onChange}
        keyboardType={keyboard}
        multiline={multiline}
      />
    </View>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { padding: 20, paddingBottom: 8 },
  title: { fontSize: 22, fontWeight: '800', color: Colors.textPrimary, letterSpacing: -0.5, marginBottom: 4 },
  vendorName: { fontSize: 14, color: Colors.textSecondary },
  form: { padding: 20, paddingTop: 8 },
  fieldLabel: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary, marginBottom: 6 },
  input: { backgroundColor: Colors.surface, borderRadius: 10, borderWidth: 1.5, borderColor: Colors.border, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: Colors.textPrimary },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20, borderWidth: 1.5, borderColor: Colors.border, backgroundColor: Colors.surface },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { fontSize: 13, fontWeight: '600', color: Colors.textSecondary },
  chipTextActive: { color: '#FFF' },
  disclaimer: { fontSize: 12, color: Colors.textMuted, lineHeight: 18, marginBottom: 16, fontStyle: 'italic' },
  primaryBtn: { backgroundColor: Colors.primary, borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginBottom: 12 },
  primaryBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  outlineBtn: { backgroundColor: Colors.surface, borderRadius: 14, paddingVertical: 16, alignItems: 'center', borderWidth: 1.5, borderColor: Colors.border, marginBottom: 20 },
  outlineBtnText: { color: Colors.textSecondary, fontSize: 15, fontWeight: '600' },
  successWrap: { padding: 28, alignItems: 'center', justifyContent: 'center', minHeight: '100%' },
  successTitle: { fontSize: 24, fontWeight: '800', color: Colors.textPrimary, marginBottom: 12, textAlign: 'center' },
  successBody: { fontSize: 14, color: Colors.textSecondary, textAlign: 'center', lineHeight: 22, marginBottom: 24 },
  summaryBox: { width: '100%', backgroundColor: Colors.surface, borderRadius: 12, padding: 14, borderWidth: 1, borderColor: Colors.border, marginBottom: 24 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 7, borderBottomWidth: 1, borderBottomColor: Colors.border },
  summaryLabel: { fontSize: 13, color: Colors.textSecondary },
  summaryVal: { fontSize: 13, fontWeight: '600', color: Colors.textPrimary },
});