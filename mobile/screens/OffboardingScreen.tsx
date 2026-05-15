import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { Pressable } from 'react-native';

type Nav = NativeStackNavigationProp<RootStackParamList>;

export default function OffboardingScreen() {
  const navigation = useNavigation<Nav>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Offboarding</Text>
      <Pressable onPress={() => navigation.goBack()}>
        <Text style={styles.back}>← Volver</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF' },
  title: { fontSize: 28, fontFamily: 'FunnelDisplay_700Bold', color: '#111', marginBottom: 20 },
  back: { fontSize: 16, fontFamily: 'FunnelDisplay_400Regular', color: '#BCF0AE' },
});