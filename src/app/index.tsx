import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

export default function AuthCheck() {
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const acessToken = await AsyncStorage.getItem('acessToken');
      if (acessToken) {
        router.navigate('/main');
      } else {
        router.navigate('/auth');
      }
    } catch (error) {
      console.error('Erro ao verificar o status de autenticação:', error);
    }
  };

  return null;
}
