import AsyncStorage from '@react-native-async-storage/async-storage';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Text,
  View,
} from 'react-native';
import { z } from 'zod';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { api } from '@/server/api';
import { UserTypes } from '@/types/user';

const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, 'Campo necessário')
      .email('Não esta no formato de email'),
    name: z.string().min(1, 'Campo necessário'),
    password: z.string().min(6, 'Mínimo de 6 caracteres'),
    confirmPassword: z.string().min(6, 'Mínimo de 6 caracteres'),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  });

type RegisterSchema = z.infer<typeof registerSchema>;

const createUser = async (userData: UserTypes): Promise<any> => {
  const response = await api.post('/user', userData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data as UserTypes;
};

export default function Home() {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const mutation = useMutation<UserTypes, Error, UserTypes, unknown>({
    mutationFn: createUser,
    onSuccess: async (data: any) => {
      await AsyncStorage.setItem('acessToken', data.acessToken);
      router.navigate('/main');
    },
  });

  function onSubmit(data: RegisterSchema) {
    const { confirmPassword, ...userData } = data;
    mutation.mutate(userData);
  }

  return (
    <KeyboardAvoidingView className="flex-1" behavior={'padding'}>
      <ImageBackground
        className="flex-1 bg-gray-700 items-center justify-center p-8"
        source={require('@/assets/Background.png')}
      >
        <Image
          source={require('@/assets/Logo.png')}
          className="h-40"
          resizeMode="contain"
        />
        {/* <Text className='color-white text-xl font-bold mt-8'>Acesse sua conta</Text> */}
        <View className="w-full mt-4 gap-3">
          <Input.Controlled
            placeholder="E-mail"
            name="email"
            control={control}
          />

          <Input.Controlled placeholder="Nome" name="name" control={control} />

          <Input.Controlled
            placeholder="Senha"
            name="password"
            control={control}
          />

          <Input.Controlled
            placeholder="Confirmar senha"
            name="confirmPassword"
            control={control}
          />

          {!!mutation.error && (
            <Text className="color-rose-500 text-xs font-regular ">
              Erro ao criar conta. Tente novamente mais tarde.
            </Text>
          )}

          <Button
            title="Registrar"
            onPress={handleSubmit(onSubmit)}
            isLoading={mutation.isPending}
            disabled={mutation.isPending}
          />

          <Button
            title="Voltar para o login"
            onPress={() => router.navigate('/auth')}
            outlined
          />
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
