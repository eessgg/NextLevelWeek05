import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler'
import { acc } from 'react-native-reanimated';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvButtonProps extends ReactButtonProps {
  title:string;
  active?:boolean;
}

export function EnvButton({
  title,
  active = false,
  ...rest
}: EnvButtonProps)  {
  return (
    <RectButton
      style={[styles.container, active && styles.containerActive]}
      {...rest}
    >
      <Text style={[
        styles.text,
        active && styles.textActive]}
      >
        {title}
      </Text>
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:colors.shape,
    width:76,
    height:40,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:12,
    marginRight:5
  },
  containerActive: {
    backgroundColor:colors.green_light
  },
  text: {
    color:colors.heading,
    fontFamily: fonts.text
  },
  textActive: {
    fontFamily: fonts.heading,
    color: colors.green_dark,
  },
})