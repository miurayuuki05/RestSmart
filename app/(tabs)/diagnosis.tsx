import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform } from 'react-native';
import { View, Text, TextInput, ScrollView } from 'react-native';
import React, { useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GaugeChart from '@/components/Gauge';
import SleepGaugeChart from '@/components/SleepGauge';
import { useFocusEffect } from 'expo-router';


const styles = StyleSheet.create({
  containerMain: {
    paddingTop: 70,
    paddingHorizontal: 30,
    marginBottom : 50,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerImage: {
    width: 50,
    height: 50,
    marginLeft: 10,
  },
  textdesc: {
    fontSize: 20,
    textAlign: 'justify',
  },
  gaugeContainer: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 100,
  },
});

export default function TabTwoScreen() {
  const [name, setName] = React.useState('');
  const [imt, setImt] = React.useState(0);
  const [status, setStatus] = React.useState('');
  const [sleepScore, setSleepScore] = React.useState(0);
  const [sleepQuality, setSleepQuality] = React.useState('');

  const fetchData = async () => {
    try {
      const name = await AsyncStorage.getItem('name');
      const imt = await AsyncStorage.getItem('imt');
      const status = await AsyncStorage.getItem('status');
      const sleepScore = await AsyncStorage.getItem('sleepScore');
      const sleepQuality = await AsyncStorage.getItem('sleepQuality');

      if (name !== null) {
        setName(name);
      }

      if (imt !== null) {
        setImt(parseFloat(imt));
      }

      if (status !== null) {
        setStatus(status);
      }

      if (sleepScore !== null) {
        setSleepScore(parseInt(sleepScore || '0'));
      }

      if (sleepQuality !== null) {
        setSleepQuality(sleepQuality);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [])
  );

  return (
    <ScrollView style={styles.containerMain}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Kesimpulan</Text>
      </View>
      <Text style={styles.textdesc}>
        Halo, <Text style={{color : '#4fd821'}}>{name}</Text>! Berdasarkan hasil diagnosis, berikut adalah kesimpulan mengenai kondisi kesehatan Anda:
      </Text>
      <View style={styles.gaugeContainer}>
        <GaugeChart value={imt} max={40} />
        <View style={{marginTop: 100, marginBottom : 50, width: '80%', height: 200}}>
          <Image source={require('../../assets/images/bmichart.png')} style={{width: '100%', height: '100%'}} />
        </View>
        <SleepGaugeChart value={sleepScore} max={8}/>
        <View style={{marginTop: 50, marginBottom : 30, width: '85%', height: 250}}>
          <Image source={require('../../assets/images/brainimg.png')} style={{width: '100%', height: '100%'}} />
        </View>
      </View>
    </ScrollView>
  );
}
