import React from 'react';
import { View, StyleSheet,Text, Image } from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import colors from '../styles/colors';

import userImg from '../assets/user.jpg';
import { color } from 'react-native-reanimated';
import fonts from '../styles/fonts';

export function Header() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá</Text>
        <Text style={styles.userName}>Ester</Text>
      </View>

      <Image 
        source={userImg}
        style={styles.image}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    marginTop: getStatusBarHeight(),
  },
  image: {
    width:75,
    height:75,
    borderRadius: 40
  },
  greeting: {
    fontSize:32,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  userName: {

  },
})