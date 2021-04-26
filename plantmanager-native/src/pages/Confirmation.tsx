import React from 'react';

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  SafeAreaView
} from 'react-native'
import { Button } from '../componentss/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation, useRoute } from '@react-navigation/core';
import {AuthRoutes} from '../routes/tab.routes'

interface Params {
  title:string;
  subtitle:string;
  buttonTitle: string;
  icon: 'smile' | 'hug';
  nextScreen:string;
}

interface emoji {
  hug: '🤗',
  smile: '😁'
}

export function Confirmation() {
  const navigation = useNavigation()
  const routes = useRoute()

  const {
    title,
    subtitle,
    nextScreen,
    icon,
    buttonTitle,
  } = routes.params as Params;

  function handleMoveOn() {
    navigation.navigate(nextScreen)
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
            {/* {emoji[icon]} */}
            {title}
        </Text>
        <Text style={styles.title}>
            {title}
        </Text>
        <Text style={styles.subtitle}>
            {subtitle}
        </Text>
        <Text style={styles.footer}>
            <Button
              title={buttonTitle}
              onPress={handleMoveOn}
            />
        </Text>
        
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'space-around'
  },
  content: {
    padding: 30,
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
    width:'100%',
  },
  emoji: {
    fontSize: 78,
  },
  title: {
    fontSize: 22,
    fontFamily:fonts.heading,
    textAlign:'center',
    color: colors.heading,
    lineHeight: 38,
    marginTop:15,
  },
  subtitle: {
    fontFamily:fonts.text,
    textAlign:'center',
    fontSize:17,
    paddingVertical:10,
    color:colors.heading
  },
  footer: {
    width:'100%',
    backgroundColor: 'red',
    paddingHorizontal:75,
    marginTop:50,
  },
})
