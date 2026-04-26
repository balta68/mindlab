import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { saveRecord } from '../utils/storage';

export default function ResultScreen() {
  const params = useLocalSearchParams();

  const feeling = String(params.feeling ?? '');
  const title = String(params.title ?? '');
  const energy = String(params.energy ?? '');
  const focus = String(params.focus ?? '');

  useEffect(() => {
    const record = {
      id: `${Date.now()}`,
      date: new Date().toISOString(),
      energy,
      focus,
      title,
      feeling,
    };

    saveRecord(record);
  }, [energy, focus, title, feeling]);

  const resultText =
    feeling === 'mejor'
      ? '¡Ha funcionado!'
      : feeling === 'igual'
        ? 'Resultado neutro'
        : feeling === 'curioso'
          ? 'Algo has observado'
          : 'Hallazgo registrado';

  const resultMessage =
    feeling === 'mejor'
      ? 'Este experimento parece haber generado un pequeño cambio positivo. Vale la pena observar si este patrón se repite.'
      : feeling === 'igual'
        ? 'No todos los experimentos cambian el estado al primer intento. También es información útil.'
        : feeling === 'curioso'
          ? 'La curiosidad es una buena señal: has detectado algo nuevo sobre cómo respondes.'
          : 'El resultado se ha guardado en tu laboratorio personal.';

  return (
    <View style={styles.container}>
      <Text style={styles.badge}>RESULTADO</Text>

      <View style={styles.card}>
        <Text style={styles.emoji}>
          {feeling === 'mejor' ? '✓' : feeling === 'curioso' ? '◇' : '–'}
        </Text>

        <Text style={styles.title}>{resultText}</Text>

        <Text style={styles.message}>{resultMessage}</Text>
      </View>

      <View style={styles.detailBox}>
        <Text style={styles.detailLabel}>Experimento registrado</Text>
        <Text style={styles.detailTitle}>{title || 'Sin título'}</Text>

        <View style={styles.metaRow}>
          <Text style={styles.metaItem}>Energía: {energy || '—'}</Text>
          <Text style={styles.metaItem}>Foco: {focus || '—'}</Text>
        </View>
      </View>

      <Link href="/checkin" style={styles.primaryButton}>
        Hacer otro check-in
      </Link>

      <Link href="/molecule" style={styles.secondaryButton}>
        Ver molécula
      </Link>

      <Link href="/" style={styles.tertiaryButton}>
        Volver a home
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#F6F4FF',
  },
  badge: {
    fontSize: 14,
    fontWeight: '800',
    color: '#5C4B8A',
    marginBottom: 16,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
  },
  emoji: {
    fontSize: 36,
    fontWeight: '900',
    color: '#8E7CF5',
    marginBottom: 12,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#2F234A',
    marginBottom: 14,
  },
  message: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4D4461',
  },
  detailBox: {
    backgroundColor: '#EDE8FF',
    borderRadius: 20,
    padding: 18,
    marginBottom: 24,
  },
  detailLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: '#5C4B8A',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  detailTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#2F234A',
    marginBottom: 12,
  },
  metaRow: {
    gap: 6,
  },
  metaItem: {
    fontSize: 14,
    color: '#5A5070',
    fontWeight: '600',
  },
  primaryButton: {
    backgroundColor: '#8E7CF5',
    color: '#FFFFFF',
    textAlign: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    fontWeight: '900',
    textDecorationLine: 'none',
    marginBottom: 12,
  },
  secondaryButton: {
    backgroundColor: '#E6E0FF',
    color: '#3E345C',
    textAlign: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    fontWeight: '800',
    textDecorationLine: 'none',
    marginBottom: 12,
  },
  tertiaryButton: {
    textAlign: 'center',
    color: '#5C4B8A',
    fontWeight: '700',
    textDecorationLine: 'none',
  },
});