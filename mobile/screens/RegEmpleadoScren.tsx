import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { ApiService } from '../services/api.service';
import LogoSGRH from '../assets/SGRH.svg';

const { width, height } = Dimensions.get('window');
type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function RegEmpleadoScreen() {
  const navigation = useNavigation<Nav>();
  const [loading, setLoading] = useState(false);
  const [accepted, setAccepted] = useState(false);

  // Estados del formulario
  const [nombre_completo, setNombre] = useState('');
  const [email_corporativo, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [telefono, setTelefono] = useState('');
  const [cargo, setCargo] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [direccion, setDireccion] = useState('');
  const [fecha_nacimiento, setFechaNacimiento] = useState('');

  const handleRegister = async () => {
    // Validar campos obligatorios
    if (!nombre_completo.trim() || !email_corporativo.trim() || !password.trim() || !cargo.trim() || !departamento.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios (nombre, email, contraseña, cargo, departamento)');
      return;
    }

    // Validar términos y condiciones
    if (!accepted) {
      Alert.alert('Error', 'Debes aceptar los términos de servicio y política de privacidad');
      return;
    }

    setLoading(true);
    try {
      await ApiService.registerEmployee({
        nombre_completo,
        email_corporativo,
        password,
        ...(telefono && { telefono }),
        cargo,
        departamento,
        ...(direccion && { direccion }),
        ...(fecha_nacimiento && { fecha_nacimiento }),
      });

      Alert.alert('¡Éxito!', 'Te has registrado correctamente. Ahora puedes iniciar sesión.', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('IniciarSesionEmpleadosScreen'),
        },
      ]);
    } catch (error: any) {
      Alert.alert('Error en el registro', error.message || 'No pudimos completar tu registro. Intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.container}>
      <StatusBar style="dark" />

      {/* Header logo */}
      <View style={styles.header}>
        <LogoSGRH width={140} height={50} />
      </View>

      {/* Título */}
      <Text style={styles.title}>
        {'Bienvenido\nal '}
        <Text style={styles.titleGreen}>equipo.</Text>
      </Text>

      <Text style={styles.subtitle}>
        Comencemos tu viaje profesional. Configura tus credenciales de acceso para conectarte con el sistema SGRH de BrightView.
      </Text>

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
          placeholder="tu@brightview.com"
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
          placeholder="Mínimo 8 caracteres"
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
          placeholder="Tu dirección"
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

        {/* Checkbox términos */}
        <Pressable style={styles.checkboxRow} onPress={() => setAccepted(!accepted)} disabled={loading}>
          <View style={[styles.checkbox, accepted && styles.checkboxChecked]} />
          <Text style={styles.checkboxText}>
            Acepto los <Text style={styles.bold}>Términos de Servicio</Text> y la{' '}
            <Text style={styles.bold}>Política de Privacidad</Text> de BrightView Landscapes para el uso de herramientas digitales.
          </Text>
        </Pressable>

        {/* Botón registrar */}
        <Pressable
          style={[styles.registerButton, loading && styles.registerButtonDisabled]}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.registerButtonText}>Registrarme</Text>
          )}
        </Pressable>

        {/* Login link */}
        <Text style={styles.loginText}>
          ¿Ya tienes una cuenta?{' '}
          <Text style={styles.loginLink} onPress={() => navigation.navigate('IniciarSesionEmpleadosScreen')}>
            Inicia sesión aquí
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: '#FFF' },
  container: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  title: {
    fontSize: 42,
    fontFamily: 'FunnelDisplay_700Bold',
    color: '#111',
    lineHeight: 48,
    marginBottom: 16,
  },
  titleGreen: { color: '#BCF0AE' },
  subtitle: {
    fontSize: 15,
    fontFamily: 'FunnelDisplay_400Regular',
    color: '#444',
    lineHeight: 22,
    marginBottom: 28,
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
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 16,
    gap: 10,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#555',
    marginTop: 2,
    flexShrink: 0,
  },
  checkboxChecked: {
    backgroundColor: '#BCF0AE',
    borderColor: '#BCF0AE',
  },
  checkboxText: {
    fontSize: 13,
    fontFamily: 'FunnelDisplay_400Regular',
    color: '#333',
    flex: 1,
    lineHeight: 18,
  },
  bold: { fontFamily: 'FunnelDisplay_700Bold' },
  registerButton: {
    backgroundColor: '#111',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  registerButtonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
    fontSize: 16,
    fontFamily: 'FunnelDisplay_700Bold',
    color: '#FFFFFF',
  },
  loginText: {
    fontSize: 13,
    fontFamily: 'FunnelDisplay_400Regular',
    color: '#666',
    textAlign: 'center',
    marginTop: 12,
  },
  loginLink: {
    fontFamily: 'FunnelDisplay_700Bold',
    color: '#333',
  },
});