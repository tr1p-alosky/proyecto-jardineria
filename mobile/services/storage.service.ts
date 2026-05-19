import AsyncStorage from '@react-native-async-storage/async-storage';

export class StorageService {
  private static readonly TOKEN_KEY = '@sgrh_token';
  private static readonly USER_KEY = '@sgrh_user';
  private static readonly REFRESH_TOKEN_KEY = '@sgrh_refresh_token';

  /**
   * Guardar token JWT
   */
  static async saveToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(this.TOKEN_KEY, token);
    } catch (error) {
      console.error('Error al guardar token:', error);
      throw error;
    }
  }

  /**
   * Obtener token JWT
   */
  static async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(this.TOKEN_KEY);
    } catch (error) {
      console.error('Error al obtener token:', error);
      return null;
    }
  }

  /**
   * Guardar datos del usuario
   */
  static async saveUser(user: any): Promise<void> {
    try {
      await AsyncStorage.setItem(this.USER_KEY, JSON.stringify(user));
    } catch (error) {
      console.error('Error al guardar usuario:', error);
      throw error;
    }
  }

  /**
   * Obtener datos del usuario
   */
  static async getUser(): Promise<any> {
    try {
      const user = await AsyncStorage.getItem(this.USER_KEY);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      return null;
    }
  }

  /**
   * Limpiar todo (logout)
   */
  static async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        this.TOKEN_KEY,
        this.USER_KEY,
        this.REFRESH_TOKEN_KEY,
      ]);
    } catch (error) {
      console.error('Error al limpiar almacenamiento:', error);
      throw error;
    }
  }

  /**
   * Verificar si hay sesión activa
   */
  static async hasActiveSession(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  }
}
