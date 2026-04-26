import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.container}>
      <Text style={styles.badge}>MINDLAB</Text>

      <Text style={styles.title}>
        Tu laboratorio personal de bienestar, equilibrio y autoconocimiento
      </Text>

      <Text style={styles.subtitle}>
        Prueba a hacer un microexperimento: observa, comprueba y aprende sin presión.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Un pequeño cambio puede causar una gran diferencia
        </Text>
        <Text style={styles.cardText}>
          Elige tu nivel de energía y lo que quieres mejorar ahora. MindLab te propondrá un experimento breve.
        </Text>
      </View>

      <Link href="/checkin" style={styles.primaryButton}>
        Empezar check-in
      </Link>

      <Link href="/molecule" style={styles.secondaryButton}>
        Ver molécula de bienestar
      </Link>

      <Link href="/history" style={styles.tertiaryButton}>
        Ver historial
      </Link>

      <Text style={styles.footer}>
        No es una tarea. No es otra obligación. Es un experimento.
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
    flexGrow: 1,
    paddingHorizontal: 28,
    paddingTop: 64,
    paddingBottom: 80,
    justifyContent: 'center',
  },
  badge: {
    fontSize: 14,
    fontWeight: '800',
    color: '#4F6D5E',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 18,
  },
  title: {
    fontSize: 38,
    lineHeight: 44,
    fontWeight: '900',
    color: '#223127',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 17,
    lineHeight: 25,
    color: '#52605A',
    marginBottom: 26,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    marginBottom: 28,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#223127',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#52605A',
  },
  primaryButton: {
    backgroundColor: '#7BC6A4',
    color: '#173126',
    textAlign: 'center',
    paddingVertical: 17,
    borderRadius: 18,
    fontWeight: '900',
    textDecorationLine: 'none',
    marginBottom: 14,
  },
  secondaryButton: {
    backgroundColor: '#E7ECE8',
    color: '#31423A',
    textAlign: 'center',
    paddingVertical: 17,
    borderRadius: 18,
    fontWeight: '800',
    textDecorationLine: 'none',
    marginBottom: 14,
  },
  tertiaryButton: {
    backgroundColor: '#DDEBF7',
    color: '#15324D',
    textAlign: 'center',
    paddingVertical: 17,
    borderRadius: 18,
    fontWeight: '800',
    textDecorationLine: 'none',
  },
  footer: {
    marginTop: 22,
    textAlign: 'center',
    color: '#6B7771',
    fontSize: 14,
    fontWeight: '600',
  },
});