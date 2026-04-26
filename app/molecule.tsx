import { Link, useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { clearRecords, ExperimentRecord, getRecords } from '../utils/storage';

function getNodeColor(focus: string) {
  switch (focus) {
    case 'calma':
      return '#9CC7FF';
    case 'foco':
      return '#FFD36E';
    case 'conexion':
      return '#F7A8C4';
    case 'energia':
      return '#B9E769';
    default:
      return '#D9D9D9';
  }
}

function getNodeSize(feeling: string) {
  switch (feeling) {
    case 'mejor':
      return 64;
    case 'curioso':
      return 52;
    case 'igual':
      return 42;
    default:
      return 36;
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

function getEnergyLabel(energy: string) {
  switch (energy) {
    case 'baja':
      return 'Baja';
    case 'media':
      return 'Media';
    case 'alta':
      return 'Alta';
    default:
      return '—';
  }
}

export default function MoleculeScreen() {
  const [records, setRecords] = useState<ExperimentRecord[]>([]);
  const router = useRouter();

  async function loadRecords() {
    const saved = await getRecords();
    setRecords(saved);
  }

  function handleClear() {
    if (typeof window !== 'undefined') {
      const confirmed = window.confirm(
        '¿Seguro que quieres eliminar todos los registros? Esta acción no se puede deshacer.'
      );

      if (confirmed) {
        clearRecords().then(() => {
          setRecords([]);
          router.replace('/');
        });
      }

      return;
    }

    Alert.alert(
      'Borrar molécula',
      '¿Seguro que quieres eliminar todos los registros? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Borrar',
          style: 'destructive',
          onPress: async () => {
            await clearRecords();
            setRecords([]);
            router.replace('/');
          },
        },
      ]
    );
  }

  useEffect(() => {
    loadRecords();
  }, []);

  const summary = useMemo(() => {
    const total = records.length;
    const better = records.filter((r) => r.feeling === 'mejor').length;
    const equal = records.filter((r) => r.feeling === 'igual').length;
    const curious = records.filter((r) => r.feeling === 'curioso').length;

    const betterPct = total ? Math.round((better / total) * 100) : 0;

    const focusStats: Record<string, { total: number; better: number }> = {
      calma: { total: 0, better: 0 },
      foco: { total: 0, better: 0 },
      conexion: { total: 0, better: 0 },
      energia: { total: 0, better: 0 },
    };

    const energyStats: Record<string, number> = {
      baja: 0,
      media: 0,
      alta: 0,
    };

    records.forEach((r) => {
      if (focusStats[r.focus]) {
        focusStats[r.focus].total += 1;
        if (r.feeling === 'mejor') {
          focusStats[r.focus].better += 1;
        }
      }

      if (energyStats[r.energy] !== undefined) {
        energyStats[r.energy] += 1;
      }
    });

    const bestFocus =
      Object.entries(focusStats)
        .map(([focus, data]) => ({
          focus,
          total: data.total,
          score: data.total ? data.better / data.total : 0,
        }))
        .filter((item) => item.total > 0)
        .sort((a, b) => b.score - a.score)[0]?.focus || '';

    const mostCommonEnergy =
      Object.entries(energyStats).sort((a, b) => b[1] - a[1])[0]?.[0] || '';

    let interpretation = 'Aún necesitas más registros para detectar un patrón fiable.';

    if (total >= 3 && betterPct >= 60) {
      interpretation = 'Tu molécula muestra una respuesta positiva frecuente. Parece que los micro-experimentos están generando cambios útiles.';
    } else if (total >= 3 && curious > better && curious > equal) {
      interpretation = 'Tu patrón principal es la curiosidad. Puede que aún no haya grandes cambios, pero estás observando señales nuevas.';
    } else if (total >= 3 && equal >= better) {
      interpretation = 'Por ahora predominan resultados neutros. Puede ser útil explorar otros focos o ajustar el tipo de experimento.';
    }

    return {
      total,
      better,
      equal,
      curious,
      betterPct,
      bestFocus,
      mostCommonEnergy,
      interpretation,
    };
  }, [records]);

  const positionedNodes = useMemo(() => {
    return records.map((record, index) => {
      const size = getNodeSize(record.feeling);

      const col = index % 4;
      const row = Math.floor(index / 4);

      const leftBase = 22 + col * 76;
      const topBase = 24 + row * 88;

      const horizontalOffset = row % 2 === 0 ? 0 : 18;
      const verticalOffset = col % 2 === 0 ? 0 : 10;

      return {
        ...record,
        size,
        left: leftBase + horizontalOffset,
        top: topBase + verticalOffset,
      };
    });
  }, [records]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.badge}>MOLÉCULA</Text>

      <Text style={styles.title}>Tu molécula de bienestar</Text>

      <Text style={styles.subtitle}>
        Cada nodo representa un experimento completado. El color indica el foco y el tamaño refleja cómo te sentiste.
      </Text>

      {records.length > 0 && (
        <Pressable style={styles.clearButton} onPress={handleClear}>
          <Text style={styles.clearButtonText}>Borrar molécula</Text>
        </Pressable>
      )}

      <View style={styles.summaryBox}>
        <Text style={styles.summaryTitle}>Lectura rápida</Text>

        <View style={styles.metricRow}>
          <View style={styles.metricCard}>
            <Text style={styles.metricNumber}>{summary.total}</Text>
            <Text style={styles.metricLabel}>Experimentos</Text>
          </View>

          <View style={styles.metricCard}>
            <Text style={styles.metricNumber}>{summary.betterPct}%</Text>
            <Text style={styles.metricLabel}>Mejora</Text>
          </View>
        </View>

        <Text style={styles.summaryText}>
          Foco más favorable: {summary.bestFocus ? getFocusLabel(summary.bestFocus) : '—'}
        </Text>

        <Text style={styles.summaryText}>
          Energía más frecuente: {summary.mostCommonEnergy ? getEnergyLabel(summary.mostCommonEnergy) : '—'}
        </Text>

        <Text style={styles.interpretation}>
          {summary.interpretation}
        </Text>
      </View>

      {records.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>Molécula todavía vacía</Text>
          <Text style={styles.emptyText}>
            Completa algunos experimentos para empezar a detectar patrones.
          </Text>
        </View>
      ) : (
        <View style={styles.canvas}>
          {positionedNodes.map((node, index) => {
            if (index === 0) return null;

            const previous = positionedNodes[index - 1];

            const x1 = previous.left + previous.size / 2;
            const y1 = previous.top + previous.size / 2;
            const x2 = node.left + node.size / 2;
            const y2 = node.top + node.size / 2;

            const dx = x2 - x1;
            const dy = y2 - y1;
            const length = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            return (
              <View
                key={`line-${node.id}`}
                style={[
                  styles.line,
                  {
                    width: length,
                    left: x1,
                    top: y1,
                    transform: [{ rotate: `${angle}deg` }],
                  },
                ]}
              />
            );
          })}

          {positionedNodes.map((record) => (
            <View
              key={record.id}
              style={[
                styles.node,
                {
                  width: record.size,
                  height: record.size,
                  borderRadius: record.size / 2,
                  backgroundColor: getNodeColor(record.focus),
                  left: record.left,
                  top: record.top,
                },
              ]}
            >
              <Text style={styles.nodeText}>
                {record.focus.slice(0, 1).toUpperCase()}
              </Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Leyenda</Text>
        <Text style={styles.legendText}>Azul = Calma</Text>
        <Text style={styles.legendText}>Amarillo = Foco</Text>
        <Text style={styles.legendText}>Rosa = Conexión</Text>
        <Text style={styles.legendText}>Verde = Energía</Text>
        <Text style={styles.legendText}>Nodo grande = Mejor</Text>
        <Text style={styles.legendText}>Nodo mediano = Curioso</Text>
        <Text style={styles.legendText}>Nodo pequeño = Igual</Text>
      </View>

      <Link href="/history" style={styles.secondaryButton}>
        Ver historial
      </Link>

      <Link href="/" style={styles.primaryButton}>
        Volver a home
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 80,
    backgroundColor: '#F7F8F4',
    flexGrow: 1,
  },
  badge: {
    fontSize: 14,
    fontWeight: '800',
    color: '#4F6D5E',
    marginBottom: 16,
    letterSpacing: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#223127',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: '#52605A',
    marginBottom: 20,
  },
  clearButton: {
    backgroundColor: '#F4D6D6',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  clearButtonText: {
    color: '#6A1F1F',
    fontWeight: '900',
    fontSize: 15,
  },
  summaryBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 24,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#223127',
    marginBottom: 14,
  },
  metricRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  metricCard: {
    flex: 1,
    backgroundColor: '#EEF2F0',
    borderRadius: 18,
    padding: 16,
  },
  metricNumber: {
    fontSize: 28,
    fontWeight: '900',
    color: '#223127',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 13,
    color: '#52605A',
    fontWeight: '700',
  },
  summaryText: {
    fontSize: 15,
    color: '#31423A',
    marginBottom: 6,
    fontWeight: '700',
  },
  interpretation: {
    marginTop: 12,
    fontSize: 15,
    lineHeight: 22,
    color: '#52605A',
  },
  emptyBox: {
    backgroundColor: '#E7ECE8',
    borderRadius: 22,
    padding: 22,
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#223127',
    marginBottom: 8,
  },
  emptyText: {
    color: '#31423A',
    fontSize: 16,
    lineHeight: 23,
  },
  canvas: {
    position: 'relative',
    height: 440,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    marginBottom: 24,
    overflow: 'hidden',
  },
  line: {
    position: 'absolute',
    height: 3,
    backgroundColor: '#D8E3DC',
  },
  node: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.96,
    zIndex: 2,
  },
  nodeText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#223127',
  },
  legend: {
    backgroundColor: '#EEF2F0',
    borderRadius: 18,
    padding: 18,
    marginBottom: 24,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: '#223127',
    marginBottom: 10,
  },
  legendText: {
    fontSize: 15,
    color: '#31423A',
    marginBottom: 4,
  },
  secondaryButton: {
    backgroundColor: '#E7ECE8',
    color: '#31423A',
    textAlign: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    fontWeight: '800',
    textDecorationLine: 'none',
    marginBottom: 12,
  },
  primaryButton: {
    backgroundColor: '#7BC6A4',
    color: '#173126',
    textAlign: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    fontWeight: '900',
    textDecorationLine: 'none',
  },
});