import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Link, router } from 'expo-router';
import { useForm } from 'react-hook-form';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { api } from '@/server/api';
import { useMutation } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loginSchema = z.object({
  email: z.string().min(1, 'Campo necessário'),
  password: z.string().min(1, 'Campo necessário'),
});

type LoginSchema = z.infer<typeof loginSchema>;

const authUser = async (userData: LoginSchema): Promise<any> => {
  const response = await api.post('/auth', userData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data as LoginSchema;
};

export default function Auth() {
  const { control, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation<LoginSchema, Error, LoginSchema, unknown>({
    mutationFn: authUser,
    onSuccess: async (data: any) => {
      await AsyncStorage.setItem('acessToken', data.acessToken);
      router.navigate('/main');
    },
    onError: (error: Error) => {
      console.error('Erro ao logar com o usuário:', error);
    },
  });

  function onSubmit(data: LoginSchema) {
    mutation.mutate(data);
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
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input.Controlled
            placeholder="Senha"
            name="password"
            control={control}
            secureTextEntry
          />

          <Button
            title="Entrar"
            onPress={handleSubmit(onSubmit)}
            isLoading={mutation.isPending}
            disabled={mutation.isPending}
          />

          <Link
            href="/auth/register"
            className="text-gray-100 text-base font-bold text-center mt-20"
          >
            Ainda não possui acesso?
          </Link>
          {/* <Link href="/register" asChild> */}
          <Button
            title="Criar conta"
            onPress={() => router.navigate('/auth/register')}
            outlined
          />
          {/* </Link> */}
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
