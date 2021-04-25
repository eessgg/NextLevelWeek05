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
import { useNavigation } from '@react-navigation/core';


export function Confirmation() {
  const navigation = useNavigation()

  function handleMoveOn() {
    navigation.navigate("PlantSelect")
  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
            😁
        </Text>
        <Text style={styles.title}>
            Agora vamos começar a cuidar das suas
            plantinhas com muito cuidado.
        </Text>
        <Text style={styles.subtitle}>
            Agora vamos começar a cuidar das suas
            plantinhas com muito cuidado.
        </Text>
        <Text style={styles.footer}>
            <Button
              title="Começar"
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
