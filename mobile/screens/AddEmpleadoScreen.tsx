import {
    StyleSheet,
    Text, 
    View, 
    ScrollView, 
    Dimensions,
    Pressable, 
    TextInput,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { ApiService } from '../services/api.service';
import Asterisk from '../assets/SGRH.svg';
import BrightView from '../assets/brightview.svg';

const { width, height } = Dimensions.get('window');
type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function AddEmpleadoScreen() {
  const navigation = useNavigation<Nav>();
  const [loading, setLoading] = useState(false);

  // Estados del formulario
  const [nombre_completo, setNombre] = useState('');
  const [email_corporativo, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [cargo, setCargo] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [direccion, setDireccion] = useState('');
  const [fecha_nacimiento, setFechaNacimiento] = useState('');

  const handleAddEmployee = async () => {
    // Validar campos obligatorios
    if (!nombre_completo.trim() || !email_corporativo.trim() || !password.trim() || !cargo.trim() || !departamento.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios (nombre, email, contraseña, cargo, departamento)');
      return;
    }

    setLoading(true);
    try {
      await ApiService.createEmployee({
        nombre_completo,
        email_corporativo,
        password,
        ...(telefono && { telefono }),
        cargo,
        departamento,
        ...(direccion && { direccion }),
        ...(fecha_nacimiento && { fecha_nacimiento }),
      });

      Alert.alert('¡Éxito!', 'Empleado agregado correctamente.', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No pudimos agregar el empleado. Intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <StatusBar style="dark" />

      {/* Header */}
      <View style={styles.header}>
        <Asterisk width={120} height={36} />
        <BrightView width={120} height={36} />
      </View>

      {/* Breadcrumb */}
      <Pressable onPress={() => navigation.goBack()}>
        <Text style={styles.breadcrumb}>&lt;-- Página de Onboarding</Text>
      </Pressable>

      {/* Título */}
      <Text style={styles.title}>Añadir empleado</Text>

      {/* Formulario */}
      <View style={styles.formCard}>
        <Text style={styles.label}>Nombre completo *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Natanael Cano"
          placeholderTextColor="#aaa"
          editable={!loading}
          value={nombre_completo}
          onChangeText={setNombre}
        />

        <Text style={styles.label}>Email corporativo *</Text>
        <TextInput
          style={styles.input}
          placeholder="empleado@brightview.com"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
          value={email_corporativo}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Contraseña *</Text>
        <TextInput
          style={styles.input}
          placeholder="Contraseña temporal"
          placeholderTextColor="#aaa"
          secureTextEntry
          editable={!loading}
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.label}>Cargo *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Jardinero, Supervisor"
          placeholderTextColor="#aaa"
          editable={!loading}
          value={cargo}
          onChangeText={setCargo}
        />

        <Text style={styles.label}>Departamento *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Mantenimiento, Administrativo"
          placeholderTextColor="#aaa"
          editable={!loading}
          value={departamento}
          onChangeText={setDepartamento}
        />

        <Text style={styles.label}>Teléfono</Text>
        <TextInput
          style={styles.input}
          placeholder="+1234567890"
          placeholderTextColor="#aaa"
          keyboardType="phone-pad"
          editable={!loading}
          value={telefono}
          onChangeText={setTelefono}
        />

        <Text style={styles.label}>Dirección</Text>
        <TextInput
          style={styles.input}
          placeholder="Dirección del empleado"
          placeholderTextColor="#aaa"
          editable={!loading}
          value={direccion}
          onChangeText={setDireccion}
        />

        <Text style={styles.label}>Fecha de nacimiento (YYYY-MM-DD)</Text>
        <TextInput
          style={styles.input}
          placeholder="1990-01-15"
          placeholderTextColor="#aaa"
          editable={!loading}
          value={fecha_nacimiento}
          onChangeText={setFechaNacimiento}
        />

        <Pressable
          style={[styles.addButton, loading && styles.addButtonDisabled]}
          onPress={handleAddEmployee}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.addButtonText}>Agregar empleado</Text>
          )}
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 40,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  breadcrumb: {
    fontSize: 14,
    fontFamily: 'FunnelDisplay_400Regular',
    color: '#111',
    marginBottom: 12,
  },
  title: {
    fontSize: 40,
    fontFamily: 'FunnelDisplay_700Bold',
    color: '#111',
    lineHeight: 46,
    marginBottom: 24,
  },
  formCard: {
    backgroundColor: '#D6F5CC',
    borderRadius: 20,
    padding: 20,
    gap: 4,
  },
  label: {
    fontSize: 14,
    fontFamily: 'FunnelDisplay_700Bold',
    color: '#222',
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 18,
    fontSize: 14,
    fontFamily: 'FunnelDisplay_400Regular',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#111',
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonDisabled: {
    opacity: 0.6,
  },
  addButtonText: {
    fontSize: 16,
    fontFamily: 'FunnelDisplay_700Bold',
    color: '#FFF',
  },
});

