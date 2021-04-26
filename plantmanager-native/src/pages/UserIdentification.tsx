import React from 'react';
import { StyleSheet, SafeAreaView, View,Text, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard , Alert} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import {Button} from '../componentss/Button'
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage'

export function UserIdentification() {
  const [isFocused, setIsFocused] = React.useState(false)
  const [isFilled, setIsFilled] = React.useState(false)
  const [name, setName] = React.useState<string>()
  const navigation = useNavigation()

  function handleInputBlur() {
    setIsFocused(false)
    setIsFilled(!name)
  }

  function handleInputFocus() {
    setIsFocused(true)
  }

  function handleInputChange(value:string){
    setIsFilled(!value)
    setName(value)
  }

  async function handleSubmit() {
    if(!name) {
      return Alert.alert('Não esqueça de escrever seu nome. 😕')
    }

   try {
      await AsyncStorage.setItem('@plantmanager:user', name);
      navigation.navigate("Confirmation", {
        title: "Prnoto",
        subtitle: 'OLASLKDASDL',
        buttonTitle: "Começar",
        icon: 'smile',
        nextScreen: 'PlantSelect'
      });
   } catch (error) {
     Alert.alert('Nao foi possível salvar seu nome.😣')
   }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.content}>
                <View style={styles.form}>
                  <View style={styles.header}>
                    <Text style={styles.emoji}>
                      {isFilled ? '🤨': '😀'}
                    </Text>
                    <Text style={styles.title}>
                      Como podemos {'\n'}
                      chamar você?
                    </Text>
                  </View>
                  <TextInput 
                    style={[
                      styles.input,
                      (isFocused && isFilled) &&
                      { borderColor: colors.green }
                    ]}
                    placeholder="digite seu nome"
                    onBlur={handleInputBlur}
                    onFocus={handleInputFocus}
                    onChangeText={handleInputChange}
                  />
                  <View style={styles.footer}>
                    <Button
                      title="Confirmar" 
                      onPress={handleSubmit}
                    />
                  </View>
                </View>
              </View>

          </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  content:{
    flex: 1,
    width:'100%'
  },
  header: {
    alignItems:'center'
  },
  form:{
    flex:1,
    justifyContent: 'center',
    paddingHorizontal: 54,
    alignItems: 'center',
    width: '100%',
  },
  emoji:{
    fontSize: 44,
  },
  input: {
    borderBottomWidth:1,
    borderColor: colors.gray,
    color:colors.heading,
    width: '100%',
    fontSize:18,
    marginTop:10,
    padding:10,
    textAlign:'center'
  },
  title: {
    fontSize:24,
    lineHeight:32,
    textAlign:'center',
    color: colors.heading,
    fontFamily:fonts.heading,
    marginTop: 20
  },
  footer: {
    width:'100%',
    marginTop: 40,
    paddingHorizontal: 20    
  }
});