import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { Spinner, TamaguiProvider } from 'tamagui';
import tamaguiConfig from './tamagui.config';
import Home from './src/Home';

export default function App() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  if (!loaded) {
    return <Spinner  />
  }

  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Home />
    </TamaguiProvider>
  );
}
