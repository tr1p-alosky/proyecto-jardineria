import {
  StyleSheet, Text, View, ScrollView, Dimensions, Pressable,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import Asterisk from '../assets/SGRH.svg';
import BrightView from '../assets/brightview.svg';

const { width } = Dimensions.get('window');
type Nav = NativeStackNavigationProp<RootStackParamList>;

const periodos = [
  { titulo: 'Periodo de Pago', fechas: '01/05/26 a 15/05/2026' },
  { titulo: 'Periodo de Pago', fechas: '15/04/2026 a 30/04/2026' },
  { titulo: 'Periodo de Pago', fechas: '01/04/26 a 15/04/2026' },
];

export default function NominaEmpleadoScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <Asterisk width={120} height={36} />
        <BrightView width={120} height={36} />
      </View>

      {/* Título */}
      <Text style={styles.title}>Nómina</Text>

      {/* Info empleado */}
      <Text style={styles.nombreText}>Natanael Cano</Text>
      <Text style={styles.infoText}>natanaelcano@gmail.com | 123456789</Text>

      {/* Lista de periodos */}
      <View style={{ marginTop: 24, gap: 12 }}>
        {periodos.map((p, i) => (
          <View key={i} style={styles.periodoCard}>
            <View style={styles.periodoBar} />
            <View style={styles.periodoInfo}>
              <Text style={styles.periodoTitulo}>{p.titulo}</Text>
              <Text style={styles.periodoFechas}>{p.fechas}</Text>
              <View style={styles.periodoButtons}>
                <Pressable style={styles.descargarBtn}>
                  <Text style={styles.descargarText}>Descargar</Text>
                </Pressable>
                <Pressable
                  style={styles.vistaBtn}
                  onPress={() => navigation.navigate('NominaEmpleadoDetalleScreen', {periodo: p})}
                >
                  <Text style={styles.vistaText}>Vista previa</Text>
                </Pressable>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#FFF' },
  container: { paddingHorizontal: 24, paddingTop: 56, paddingBottom: 40 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  title: { fontSize: 40, fontFamily: 'FunnelDisplay_700Bold', color: '#111', marginBottom: 12 },
  nombreText: { fontSize: 15, fontFamily: 'FunnelDisplay_700Bold', color: '#111' },
  infoText: { fontSize: 14, fontFamily: 'FunnelDisplay_400Regular', color: '#555', marginBottom: 4 },
  periodoCard: { flexDirection: 'row', backgroundColor: '#F0FBF0', borderRadius: 12, overflow: 'hidden' },
  periodoBar: { width: 6, backgroundColor: '#111' },
  periodoInfo: { flex: 1, padding: 16 },
  periodoTitulo: { fontSize: 16, fontFamily: 'FunnelDisplay_700Bold', color: '#111', marginBottom: 4 },
  periodoFechas: { fontSize: 14, fontFamily: 'FunnelDisplay_400Regular', color: '#888', marginBottom: 12 },
  periodoButtons: { flexDirection: 'row', gap: 10 },
  descargarBtn: { backgroundColor: '#BCF0AE', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 18 },
  descargarText: { fontSize: 13, fontFamily: 'FunnelDisplay_400Regular', color: '#111' },
  vistaBtn: { backgroundColor: '#111', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 18 },
  vistaText: { fontSize: 13, fontFamily: 'FunnelDisplay_400Regular', color: '#FFF' },
});