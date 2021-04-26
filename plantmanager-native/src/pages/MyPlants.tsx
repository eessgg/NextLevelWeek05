import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, FlatList, Alert } from 'react-native';

import { Header } from '../componentss/Header';

import waterdrop from '../assets/waterdrop.png'
import colors from '../styles/colors';
import { loadPlant, PlantProps } from './../libs/storage';
import { formatDistance } from 'date-fns';
import fonts from '../styles/fonts';
import { pt } from 'date-fns/locale';
import { PlantCardSecondary } from './../componentss/PlantCardSecondary';
import { Load } from '../componentss/Load';
import { AsyncStorage } from '@react-native-async-storage/async-storage';

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWater, setNextWater] = useState<string>();

  function handleRemove(plant: PlantProps) {
    Alert.alert('remover', `Remover ${plant.name}?`, [
      {
        text:'Nao',
        style:'cancel'
      },
      {
        text: 'Sim',
        onPress: async () => {
          try {
            const data = await AsyncStorage.getItem('@plantmanager:plants');
            const plants = data ? (JSON.parse(data) as StoragePlantProps) : {};

            delete plants[plant.id];

            await AsyncStorage.setItem(
              '@plantmanager:plants',
              JSON.stringify(plants)
            )

            setMyPlants(oldData => {
              oldData.filter((item) => item.id === plant.id)
            })

          } catch (error) {
            Alert.alert('Nao removido.')
          }
        }
      }
    ])
  }

  useEffect(() => {
    async function loadStorageData() {
      const plantsStoraged = await loadPlant();

      const nextTime = formatDistance(
        new Date(plantsStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        {locale: pt}
      )

      setNextWater(
        `Nao esqueça de regar a ${plantsStoraged[0].name} à ${nextTime} horas.`
      )

      setMyPlants(plantsStoraged)
      setLoading(false)
    }

    loadStorageData()
  }, [])

  if(loading) {
    return <Load />
  }

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.spotlight}>
        <Image source={waterdrop} style={styles.spotlightImage} />
        <Text style={styles.spotligthText}>
          Proximas regadas
        </Text>

        <View style={styles.plants}>
          <Text style={styles.plantsTitle}>

          </Text>

          <FlatList 
            data={myPlants}
            keyExtractor={(item) => String(item.id)}
            renderItem={({item}) => (
              <PlantCardSecondary data={item} handleRemove={handleRemove(item)} />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{flex:1}}
          />
        </View>

      </View>
    </View>  
  );
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:'30',
    paddingTop:50,
    backgroundColor:colors.background
  },
  spotlight: {

  },
  spotlightImage: {

  },
  spotligthText: {

  },
  plants: {

  },
  plantsTitle: {

  },
})