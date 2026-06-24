import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="vendor/[id]"
          options={{
            headerShown: true,
            headerTitle: '',
            headerBackTitle: 'Back',
            headerTintColor: '#E8622A',
            headerStyle: { backgroundColor: '#FAFAF8' },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="package/[id]"
          options={{
            headerShown: true,
            headerTitle: 'Package Details',
            headerBackTitle: 'Back',
            headerTintColor: '#E8622A',
            headerStyle: { backgroundColor: '#FAFAF8' },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="quote/[vendorId]"
          options={{
            headerShown: true,
            headerTitle: 'Request Quote',
            headerBackTitle: 'Back',
            headerTintColor: '#E8622A',
            headerStyle: { backgroundColor: '#FAFAF8' },
            headerShadowVisible: false,
          }}
        />
      </Stack>
    </>
  );
}