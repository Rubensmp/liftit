import { Button } from '@/components/button';
import { Loading } from '@/components/loading';
import { api } from '@/server/api';
import { ProfileTypes } from '@/types/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import { router } from 'expo-router';
import { KeyboardAvoidingView, View, Text } from 'react-native';

const getUser = async () => {
  const acessToken = await AsyncStorage.getItem('acessToken');

  const response = await api.get('/profile', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${acessToken}`,
    },
  });
  return response.data.user as ProfileTypes;
};

export default function Main() {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['profile'],
    queryFn: getUser,
  });

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('acessToken');
      router.navigate('/auth');
    } catch (error) {
      console.log('Erro ao fazer logout:', error);
    }
  };

  if (isLoading)
    return (
      <View className="flex-1 bg-gray-700 items-center justify-center p-8">
        <Loading />
      </View>
    );

  return (
    <KeyboardAvoidingView className="flex-1" behavior={'padding'}>
      <View className="flex-1 bg-gray-700 items-center justify-center p-8">
        <Text className="text-gray-100 text-base  text-center">
          Oi, {data?.name}
        </Text>

        <Button title="Sair" onPress={() => handleLogout()} outlined />
      </View>
    </KeyboardAvoidingView>
  );
}
