import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { clearRecords, ExperimentRecord, getRecords } from '../utils/storage';

function getFeelingLabel(feeling: string) {
  switch (feeling) {
    case 'mejor':
      return 'Mejor';
    case 'igual':
      return 'Igual';
    case 'curioso':
      return 'Curioso';
    default:
      return 'Registrado';
  }
}

function getFocusLabel(focus: string) {
  switch (focus) {
    case 'calma':
      return 'Calma';
    case 'foco':
      return 'Foco';
    case 'conexion':
      return 'Conexión';
    case 'energia':
      return 'Energía';
    default:
      return 'Otro';
  }
}

export default function HistoryScreen() {
  const [records, setRecords] = useState<ExperimentRecord[]>([]);

  async function loadRecords() {
    const saved = await getRecords();
    setRecords(saved);
  }

  async function handleClear() {
    const confirmed = window.confirm(
      '¿Seguro que quieres borrar todo el historial? Esta acción no se puede deshacer.'
    );

    if (!confirmed) return;

    await clearRecords();
    setRecords([]);
  }

  useEffect(() => {
    loadRecords();
  }, []);

  const total = records.length;
  const better = records.filter((r) => r.feeling === 'mejor').length;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.badge}>BITÁCORA</Text>

      <Text style={styles.title}>Tu historial de experimentos</Text>

      <Text style={styles.subtitle}>
        Aquí queda registrado lo que has probado y cómo te ha sentado.
      </Text>

      <View style={styles.summaryBox}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>{total}</Text>
          <Text style={styles.summaryLabel}>Experimentos</Text>
        </View>

        <View style={styles.summaryItem}>
          <Text style={styles.summaryNumber}>{better}</Text>
          <Text style={styles.summaryLabel}>Con mejora</Text>
        </View>
      </View>

      {records.length > 0 && (
        <Pressable style={styles.clearButton} onPress={handleClear}>
          <Text style={styles.clearButtonText}>Borrar historial</Text>
        </Pressable>
      )}

      {records.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>Aún no hay registros</Text>
          <Text style={styles.emptyText}>
            Haz tu primer check-in y completa un experimento para empezar a construir tu bitácora.
          </Text>
        </View>
      ) : (
        records.map((record) => (
          <View key={record.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{record.title}</Text>
              <Text style={styles.feelingPill}>{getFeelingLabel(record.feeling)}</Text>
            </View>

            <View style={styles.metaRow}>
              <Text style={styles.metaItem}>Energía: {record.energy}</Text>
              <Text style={styles.metaItem}>Foco: {getFocusLabel(record.focus)}</Text>
            </View>

            <Text style={styles.date}>
              {new Date(record.date).toLocaleString()}
            </Text>
          </View>
        ))
      )}

      <Link href="/checkin" style={styles.primaryButton}>
        Nuevo check-in
      </Link>

      <Link href="/molecule" style={styles.secondaryButton}>
        Ver molécula
      </Link>

      <Link href="/" style={styles.backLink}>
        Volver a home
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 80,
    backgroundColor: '#F4FBF7',
    flexGrow: 1,
  },
  badge: {
    fontSize: 14,
    fontWeight: '800',
    color: '#3D7A5C',
    marginBottom: 16,
    letterSpacing: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#1F3A2E',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4B6358',
    marginBottom: 22,
  },
  summaryBox: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 18,
  },
  summaryItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
  },
  summaryNumber: {
    fontSize: 30,
    fontWeight: '900',
    color: '#1F3A2E',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#4B6358',
    fontWeight: '700',
  },
  clearButton: {
    backgroundColor: '#F4D6D6',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 22,
  },
  clearButtonText: {
    color: '#6A1F1F',
    fontWeight: '900',
    fontSize: 15,
  },
  emptyBox: {
    backgroundColor: '#E6F2EB',
    borderRadius: 22,
    padding: 22,
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#1F3A2E',
    marginBottom: 8,
  },
  emptyText: {
    color: '#355548',
    fontSize: 16,
    lineHeight: 23,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 18,
    marginBottom: 14,
  },
  cardHeader: {
    gap: 10,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '900',
    color: '#1F3A2E',
    lineHeight: 22,
  },
  feelingPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#DDF2E6',
    color: '#1F3A2E',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    overflow: 'hidden',
    fontWeight: '800',
    fontSize: 13,
  },
  metaRow: {
    gap: 5,
    marginBottom: 10,
  },
  metaItem: {
    fontSize: 14,
    color: '#355548',
    fontWeight: '700',
  },
  date: {
    fontSize: 13,
    color: '#6B8178',
  },
  primaryButton: {
    backgroundColor: '#7BC6A4',
    color: '#173126',
    textAlign: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    fontWeight: '900',
    textDecorationLine: 'none',
    marginTop: 14,
    marginBottom: 12,
  },
  secondaryButton: {
    backgroundColor: '#E6F2EB',
    color: '#1F3A2E',
    textAlign: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    fontWeight: '800',
    textDecorationLine: 'none',
    marginBottom: 12,
  },
  backLink: {
    textAlign: 'center',
    color: '#3D7A5C',
    fontWeight: '700',
    textDecorationLine: 'none',
  },
});