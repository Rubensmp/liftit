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

const loginSchema = z.object({
  email: z.string().min(1, 'Campo necessário'),
  password: z.string().min(1, 'Campo necessário'),
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function Home() {
  const { control, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(data: LoginSchema) {
    console.log(data);
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

          <Input.Controlled
            placeholder="Senha"
            name="password"
            control={control}
            secureTextEntry
          />

          <Button
            title="Entrar"
            onPress={handleSubmit(onSubmit)}
            isLoading={false}
          />

          <Link
            href="/register"
            className="text-gray-100 text-base font-bold text-center mt-20"
          >
            Ainda não possui acesso?
          </Link>
          {/* <Link href="/register" asChild> */}
          <Button
            title="Criar conta"
            onPress={() => router.navigate('/register')}
            isLoading={false}
            outlined
          />
          {/* </Link> */}
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
