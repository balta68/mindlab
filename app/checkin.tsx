import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function CheckinScreen() {
  const [energy, setEnergy] = useState<string | null>(null);
  const [focus, setFocus] = useState<string | null>(null);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.badge}>CHECK-IN</Text>

      <Text style={styles.title}>
        ¿Cómo estás ahora mismo?
      </Text>

      <Text style={styles.subtitle}>
        No hace falta pensarlo mucho. Elige lo que más se acerque.
      </Text>

      {/* ENERGÍA */}
      <Text style={styles.sectionTitle}>Tu nivel de energía</Text>

      <View style={styles.optionsRow}>
        {[
          { key: 'baja', label: 'Baja', desc: 'Cansancio / poca energía' },
          { key: 'media', label: 'Media', desc: 'Normal / estable' },
          { key: 'alta', label: 'Alta', desc: 'Activado / intenso' },
        ].map((opt) => (
          <Pressable
            key={opt.key}
            style={[
              styles.optionCard,
              energy === opt.key && styles.optionSelected,
            ]}
            onPress={() => setEnergy(opt.key)}
          >
            <Text style={styles.optionTitle}>{opt.label}</Text>
            <Text style={styles.optionDesc}>{opt.desc}</Text>
          </Pressable>
        ))}
      </View>

      {/* FOCO */}
      <Text style={styles.sectionTitle}>¿Qué necesitas ahora?</Text>

      <View style={styles.optionsGrid}>
        {[
          { key: 'calma', label: 'Calma' },
          { key: 'foco', label: 'Concentrarme en algo' },
          { key: 'conexion', label: 'Sentirme conectado con otras personas' },
          { key: 'energia', label: 'Energía' },
        ].map((opt) => (
          <Pressable
            key={opt.key}
            style={[
              styles.optionBox,
              focus === opt.key && styles.optionSelected,
            ]}
            onPress={() => setFocus(opt.key)}
          >
            <Text style={styles.optionTitle}>{opt.label}</Text>
          </Pressable>
        ))}
      </View>

      {/* BOTÓN */}
      {energy && focus && (
        <Link
          href={{
            pathname: '/experiment',
            params: { energy, focus },
          }}
          style={styles.primaryButton}
        >
          Ver experimento
        </Link>
      )}

      <Text style={styles.hint}>
        Solo te llevará unos minutos.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7F8F4',
  },
  container: {
    padding: 24,
    paddingBottom: 80,
  },
  badge: {
    fontSize: 14,
    fontWeight: '800',
    color: '#4F6D5E',
    marginBottom: 16,
    letterSpacing: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#223127',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#52605A',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#223127',
    marginBottom: 12,
    marginTop: 12,
  },
  optionsRow: {
    gap: 12,
    marginBottom: 20,
  },
  optionCard: {
    backgroundColor: '#E7ECE8',
    borderRadius: 16,
    padding: 16,
  },
  optionBox: {
    backgroundColor: '#E7ECE8',
    borderRadius: 14,
    padding: 16,
    width: '48%',
    alignItems: 'center',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 24,
  },
  optionSelected: {
    backgroundColor: '#CFE8DA',
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#223127',
  },
  optionDesc: {
    fontSize: 13,
    color: '#52605A',
    marginTop: 4,
  },
  primaryButton: {
    backgroundColor: '#7BC6A4',
    color: '#173126',
    textAlign: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    fontWeight: '800',
    textDecorationLine: 'none',
    marginBottom: 16,
  },
  hint: {
    textAlign: 'center',
    color: '#52605A',
    fontSize: 14,
  },
});