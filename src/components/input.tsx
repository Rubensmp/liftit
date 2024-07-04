import { ReactNode } from 'react';
import { TextInput, View, TextInputProps, Text } from 'react-native';

import { colors } from '@/styles/colors';
import { Control, useController } from 'react-hook-form';

interface ControlledInputProps extends TextInputProps {
  name: string;
  control: any;
}

interface ContainerProps {
  children: ReactNode;
  hasError?: boolean;
}

function InputContainer({ children, hasError }: ContainerProps) {
  return (
    <View
      className={`w-full h-14 flex-row gap-3 bg-gray-600 ${
        hasError && 'border-2 border-rose-500'
      } rounded-lg`}
    >
      {children}
    </View>
  );
}

function InputField({ ...rest }: TextInputProps) {
  return (
    <TextInput
      className="flex-1 text-white text-base font-regular p-3"
      placeholderTextColor={colors.gray[200]}
      {...rest}
    />
  );
}

function ControlledInput({ name, control, ...rest }: ControlledInputProps) {
  const { field, fieldState } = useController({
    control,
    defaultValue: '',
    name,
  });

  const hasErrors = !!fieldState.error;

  return (
    <View className="">
      <InputContainer hasError={hasErrors}>
        <TextInput
          className="flex-1 text-white text-base font-regular p-3"
          placeholderTextColor={colors.gray[200]}
          value={field.value}
          onChangeText={field.onChange}
          {...rest}
        />
      </InputContainer>
      {hasErrors && (
        <Text className="text-rose-500 text-xs">
          {fieldState.error?.message}
        </Text>
      )}
    </View>
  );
}

export const Input = {
  Container: InputContainer,
  Field: InputField,
  Controlled: ControlledInput,
};
