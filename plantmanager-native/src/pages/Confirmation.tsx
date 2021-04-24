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


export function Confirmation() {
  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>
            😋
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
            <Button />
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
    padding:10
  },
  emoji: {
    fontSize: 32,
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
    paddingVertical:20,
    color:colors.heading
  },
  footer: {
    width:'100%',
    paddingHorizontal:75
  },
})
