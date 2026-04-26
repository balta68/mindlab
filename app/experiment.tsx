import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Experiment, experiments } from '../data/experiments';
import { ExperimentRecord, getRecords } from '../utils/storage';

const API_URL = 'https://mindlab-api.vercel.app/api/generate-experiment';

export default function ExperimentScreen() {
  const params = useLocalSearchParams();

  const energy = String(params.energy ?? '');
  const focus = String(params.focus ?? '');

  const [experiment, setExperiment] = useState<Experiment | null>(null);
  const [source, setSource] = useState<'api' | 'local'>('local');

  useEffect(() => {
    async function getLocalExperiment() {
      const records: ExperimentRecord[] = await getRecords();

      const matches = experiments.filter(
        (exp) => exp.focus === focus && exp.energy.includes(energy as any)
      );

      if (matches.length === 0) return null;

      const recentTitles = records.slice(0, 3).map((record) => record.title);

      const nonRecentMatches =
        matches.length > 1
          ? matches.filter((exp) => !recentTitles.includes(exp.title))
          : matches;

      const pool = nonRecentMatches.length > 0 ? nonRecentMatches : matches;

      return pool[Math.floor(Math.random() * pool.length)];
    }

    async function selectExperiment() {
      try {
        const records: ExperimentRecord[] = await getRecords();
        const recentTitles = records.slice(0, 3).map((r) => r.title);

        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            energy,
            focus,
            recentTitles,
          }),
        });

        if (!response.ok) {
          throw new Error('API error');
        }

        const data = await response.json();

        if (
          !data.title ||
          !data.hypothesis ||
          !Array.isArray(data.steps) ||
          data.steps.length === 0
        ) {
          throw new Error('Invalid API response');
        }

        setExperiment({
          id: `api-${Date.now()}`,
          title: data.title,
          focus: data.focus || focus,
          energy: [data.energy || energy],
          hypothesis: data.hypothesis,
          steps: data.steps,
        });

        setSource('api');
      } catch (error) {
        const localExperiment = await getLocalExperiment();
        setExperiment(localExperiment);
        setSource('local');
      }
    }

    selectExperiment();
  }, [energy, focus]);

  if (!experiment) {
    return (
      <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
        <Text style={styles.title}>Diseñando un experimento apropiado a tu nivel de energía y necesidad</Text>

        <Text style={styles.hypothesis}>
          Espera unos segundos mientras seleccionamos el experimento más adecuado para ti. Si ves esta pantalla durante mucho tiempo, prueba a volver al inicio y reintentarlo.
        </Text>

        <Link href="/checkin" style={styles.backLink}>
          Volver al check-in
        </Link>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.badge}>
        {source === 'api' ? 'EXPERIMENTO GENERADO' : 'EXPERIMENTO DEL DÍA'}
      </Text>

      <Text style={styles.title}>{experiment.title}</Text>

      <Text style={styles.hypothesis}>{experiment.hypothesis}</Text>

      <View style={styles.card}>
        {experiment.steps.map((step, index) => (
          <Text key={index} style={styles.step}>
            {index + 1}. {step}
          </Text>
        ))}
      </View>

      <Text style={styles.sectionTitle}>¿Cómo te has sentido?</Text>

      <Link
        href={{
          pathname: '/result',
          params: {
            feeling: 'mejor',
            title: experiment.title,
            energy,
            focus: experiment.focus,
          },
        }}
        style={styles.primaryButton}
      >
        Mejor
      </Link>

      <Link
        href={{
          pathname: '/result',
          params: {
            feeling: 'igual',
            title: experiment.title,
            energy,
            focus: experiment.focus,
          },
        }}
        style={styles.secondaryButton}
      >
        Igual
      </Link>

      <Link
        href={{
          pathname: '/result',
          params: {
            feeling: 'curioso',
            title: experiment.title,
            energy,
            focus: experiment.focus,
          },
        }}
        style={styles.tertiaryButton}
      >
        Curioso
      </Link>

      <Link href="/checkin" style={styles.backLink}>
        Nuevo experimento
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFF9F1',
  },
  container: {
    flexGrow: 1,
    padding: 24,
    paddingBottom: 96,
    backgroundColor: '#FFF9F1',
  },
  badge: {
    fontSize: 14,
    fontWeight: '800',
    color: '#8A5A12',
    marginBottom: 16,
    letterSpacing: 1,
  },
  title: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '800',
    color: '#4A320B',
    marginBottom: 16,
  },
  hypothesis: {
    fontSize: 16,
    lineHeight: 24,
    color: '#6E542B',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFE7B8',
    borderRadius: 18,
    padding: 20,
    marginBottom: 24,
  },
  step: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4A320B',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#4A320B',
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#7BC6A4',
    color: '#173126',
    textAlign: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    fontWeight: '800',
    textDecorationLine: 'none',
    marginBottom: 12,
  },
  secondaryButton: {
    backgroundColor: '#E6E0D2',
    color: '#4A320B',
    textAlign: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    fontWeight: '700',
    textDecorationLine: 'none',
    marginBottom: 12,
  },
  tertiaryButton: {
    backgroundColor: '#D9ECFF',
    color: '#15324D',
    textAlign: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    fontWeight: '700',
    textDecorationLine: 'none',
    marginBottom: 20,
  },
  backLink: {
    textAlign: 'center',
    color: '#6E542B',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'none',
  },
});