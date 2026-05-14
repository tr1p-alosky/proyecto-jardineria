import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import LogoSGRH from '../assets/SGRH.svg';

const { width, height } = Dimensions.get('window');

type Props = {
  onBack: () => void;
  onLogin: () => void;
};

export default function RegAdminScreen({ onBack, onLogin }: Props) {
  const [accepted, setAccepted] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
        Comencemos su viaje profesional. Configure sus credenciales de acceso para conectarse con el sistema de lorem ipsum dolor.
      </Text>

      {/* Formulario */}
      <View style={styles.formCard}>
        <Text style={styles.label}>Nombre completo</Text>
        <TextInput style={styles.input} placeholder="Ej. Natanael Cano" placeholderTextColor="#aaa" />

        <Text style={styles.label}>ID de empleado</Text>
        <TextInput style={styles.input} placeholder="123456..." placeholderTextColor="#aaa" keyboardType="numeric" />

        <Text style={styles.label}>Departamento</Text>
        <TextInput style={styles.input} placeholder="Seleccione area" placeholderTextColor="#aaa" />

        <Text style={styles.label}>Email de trabajo</Text>
        <TextInput style={styles.input} placeholder="lorem@ipsum.dolor" placeholderTextColor="#aaa" keyboardType="email-address" />

        <Text style={styles.label}>Ingresa tu contraseña</Text>
        <TextInput style={styles.input} placeholder="12345" placeholderTextColor="#aaa" secureTextEntry />

        {/* Checkbox términos */}
        <Pressable style={styles.checkboxRow} onPress={() => setAccepted(!accepted)}>
          <View style={[styles.checkbox, accepted && styles.checkboxChecked]} />
          <Text style={styles.checkboxText}>
            Acepto los <Text style={styles.bold}>Términos de Servicio</Text> y la{' '}
            <Text style={styles.bold}>Política de Privacidad</Text> de BrightView Landscapes para el uso de herramientas digitales en campo.
          </Text>
        </Pressable>

        {/* Botón registrar */}
        <Pressable style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Registrarme</Text>
        </Pressable>

        {/* Login link */}
        <Text style={styles.loginText}>
          Ya tienes una cuenta? <Text style={styles.loginLink} onPress={onLogin}>Inicia sesión aquí</Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 12,
  },
  logoBox: {
    width: 48,
    height: 48,
    backgroundColor: '#BCF0AE',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  logoText: {
    fontSize: 18,
    fontFamily: 'FunnelDisplay_700Bold',
    color: '#BCF0AE',
    lineHeight: 22,
  },
  title: {
    fontSize: 42,
    fontFamily: 'FunnelDisplay_700Bold',
    color: '#111',
    lineHeight: 48,
    marginBottom: 16,
  },
  titleGreen: {
    color: '#BCF0AE',
  },
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
  bold: {
    fontFamily: 'FunnelDisplay_700Bold',
  },
  registerButton: {
    backgroundColor: '#111',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
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