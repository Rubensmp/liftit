import '@/styles/global.css';

import { useEffect } from 'react';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  focusManager,
  onlineManager,
} from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';

import {
  useFonts,
  Roboto_700Bold,
  Roboto_500Medium,
  Roboto_400Regular,
} from '@expo-google-fonts/roboto';

import { Loading } from '@/components/loading';
import { AppState, AppStateStatus } from 'react-native';

const client = new QueryClient({
  queryCache: new QueryCache(),
});

export default function Layout() {
  useEffect(() => {
    onlineManager.setEventListener(setOnline => {
      return NetInfo.addEventListener(state => {
        setOnline(!!state.isConnected);
      });
    });
  }, [NetInfo, onlineManager]);

  useEffect(() => {
    const subscriber = AppState.addEventListener('change', onFocusRefetch);

    return () => subscriber.remove();
  }, []);

  function onFocusRefetch(status: AppStateStatus) {
    focusManager.setFocused(status === 'active');
  }

  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_500Medium,
    Roboto_400Regular,
  });

  return (
    <QueryClientProvider client={client}>
      <StatusBar style="light" />
      {fontsLoaded ? <Slot /> : <Loading />}
    </QueryClientProvider>
  );
}
