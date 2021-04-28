import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Routes from './src/routes/index';
import {useFonts, Jost_400Regular, Jost_600SemiBold} from '@expo-google-fonts/jost';
import AppLoading from 'expo-app-loading';
import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { PlantProps } from './src/libs/storage';

export default function App() {
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  })

  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      async notification => {
        const data = notification.request.content.data.plant as PlantProps;
        console.log(data)
      }
    )

    return () => subscription.remove()
  }, [])

  if(!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <Routes />
  );
}

