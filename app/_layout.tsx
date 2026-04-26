import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="checkin" />
        <Stack.Screen name="experiment" />
        <Stack.Screen name="result" />
        <Stack.Screen name="history" />
        <Stack.Screen name="molecule" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}