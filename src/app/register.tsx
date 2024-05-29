import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Link } from 'expo-router';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  View,
} from 'react-native';

export default function Home() {
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
          <Input>
            <Input.Field
              placeholder="E-mail"
              onChangeText={() => console.log()}
            />
          </Input>

          <Input>
            <Input.Field
              placeholder="Nome"
              onChangeText={() => console.log()}
            />
          </Input>

          <Input>
            <Input.Field
              placeholder="Data de nascimento"
              onChangeText={() => console.log()}
            />
          </Input>

          <Input>
            <Input.Field
              placeholder="Senha"
              onChangeText={() => console.log()}
            />
          </Input>

          <Input>
            <Input.Field
              placeholder="Confirmar senha"
              onChangeText={() => console.log()}
            />
          </Input>

          <Button
            title="Registrar"
            onPress={() => console.log('xD')}
            isLoading={false}
          />

          <Link href="/" asChild>
            <Button
              title="Voltar para o login"
              onPress={() => console.log('xD')}
              isLoading={false}
              outlined
            />
          </Link>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}
