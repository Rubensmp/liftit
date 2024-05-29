import {
  Text,
  PressableProps,
  ActivityIndicator,
  Pressable,
} from 'react-native';

type Props = PressableProps & {
  title: string;
  isLoading?: boolean;
  outlined?: boolean;
};

export function Button({
  title,
  isLoading = false,
  outlined = false,
  ...rest
}: Props) {
  return (
    <Pressable
      disabled={isLoading}
      className={`w-full h-14 items-center justify-center rounded-lg ${
        outlined ? 'border border-yellow-500' : 'bg-yellow-500'
      }`}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator
          className={outlined ? 'text-yellow-500' : 'text-white'}
        />
      ) : (
        <Text
          className={` text-base font-bold uppercase ${
            outlined ? 'border text-white' : 'text-gray-600'
          }`}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}
