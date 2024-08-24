import { Image, StyleSheet, Platform, Button, Pressable, TouchableHighlight } from 'react-native';

import React from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { useState, useMemo } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { RadioGroup } from 'react-native-radio-buttons-group';
import { Appearance } from 'react-native';
import boybmi from '../../databmi/boybmi.json';
import girlbmi from '../../databmi/girlbmi.json';
import GaugeChart from '@/components/Gauge';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


SplashScreen.preventAutoHideAsync()


const data = [
  { label: '2 Tahun', value: '2' },
  { label: '3 Tahun', value: '3' },
  { label: '4 Tahun', value: '4' },
  { label: '5 Tahun', value: '5' },
  { label: '6 Tahun', value: '6' },
  { label: '7 Tahun', value: '7' },
  { label: '8 Tahun', value: '8' },
  { label: '9 Tahun', value: '9' },
  { label: '10 Tahun', value: '10' },
  { label: '11 Tahun', value: '11' },
  { label: '12 Tahun', value: '12' },
  { label: '13 Tahun', value: '13' },
  { label: '14 Tahun', value: '14' },
  { label: '15 Tahun', value: '15' },
  { label: '16 Tahun', value: '16' },
  { label: '17 Tahun', value: '17' },
  { label: '18 Tahun', value: '18' },
  { label: '19 Tahun', value: '19' },
  { label: '20 Tahun', value: '20' },
  { label: '> 21 Tahun', value: '21' },
];

const colorScheme = Appearance.getColorScheme();
const mainColor = '#e96f0a';

let styles : any;


  styles = StyleSheet.create({  
    containerMain: {
      paddingTop: 70,
      paddingHorizontal: 30,
      marginBottom : 50,
    },
    headerText: {
      color: 'black',
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 30,
      fontFamily : 'NunitoSans',
    },
    textColor: {
      color: 'black',
      marginBottom: 5,
    },
    textColorWhite: {
      color: 'white',
      marginBottom: 5,
    },
    dropdown: {
      height: 50,
      borderBottomWidth: 1,
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      color: 'black',
    },
    selectedTextStyle: {
      color: 'black',
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    iconStyle: {
      color: 'black',
    },
    radioStyle: {
      display: 'flex',
      color: 'black',
    },
    formStyle : {
      height: 40, 
      borderColor: 'gray', 
      borderWidth: 1, 
      color:'black',
      paddingLeft : 10,
      marginBottom : 30,
      borderRadius : 15,
    },
    flex : {
      display : 'flex',
      flexDirection : 'row',
      justifyContent : 'space-between'
    },
    buttonReset : {
      backgroundColor : '#fff',
      color : 'black',
      marginTop : 10,
      borderRadius : 15,      
      width : '45%',
      padding : 5,
      shadowColor: "#000",
      shadowOffset: {
	    width: 0,
	    height: 4,
      } ,
      shadowOpacity: 0.32,
      shadowRadius: 5.46,
      elevation: 9,
    },
    buttonImt : {
      backgroundColor : mainColor,
      color : 'white',
      marginTop : 10,
      shadowColor: "#000",
      shadowOffset: {
	      width: 0,
	      height: 4,
      },
      shadowOpacity: 0.32,
      shadowRadius: 5.46,
      elevation: 9,
      width : '45%',
      padding : 5,
      borderRadius : 15,
    },
    centerText : {
      textAlign : 'center'
    },
    formSub : {
      width : '30%',
    },
    chartStyle : {
      display : 'flex',
      alignItems : 'center',
      justifyContent : 'center',
      marginTop : 20,
      marginBottom : 20,
    }, 
  });

export default function HomeScreen() {  
  const [loaded, error] = useFonts({
    'NunitoSans': require('../../assets/fonts/NunitoSans.ttf'),
  });


  const radioButton = useMemo(() => ([
    {
      id : 'M',
      label : "Laki Laki",
      value : "M"
    },
    {
      id : 'F',
      label : "Perempuan",
      value : "F"
    }
  ]), [])

  const [name, setName] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [imt, setImt] = useState(0);
  const [status, setStatus] = useState('');
  const [gender, setGender] = useState('');

  const calculateIMT = async () => {
    const numberWeight = Number(weight);
    const numberHeight = Number(height);
    const numberAge = Number(age);

    let imt = 0;
    if (isNaN(numberWeight) || isNaN(numberHeight) || numberHeight === 0 || name === '' || age === '') {
      return 'Input Data Anda';
    }

    imt = numberWeight / ((numberHeight / 100) * (numberHeight / 100));
    setImt(imt);

    await AsyncStorage.setItem('imt', imt.toString());
    await AsyncStorage.setItem('status', status);
    await AsyncStorage.setItem('name', name);
    await AsyncStorage.setItem('weight', weight);
    await AsyncStorage.setItem('height', height);
    await AsyncStorage.setItem('age', age);
    await AsyncStorage.setItem('gender', gender);
    
    if(numberAge > 20){    
      if (imt < 17) {
        setStatus('Sangat kurus');
      } else if (imt >= 17 && imt <= 18.5) {
        setStatus('Kurus');
      } else if (imt >= 18.5 && imt <= 25) {
        setStatus('Normal');
      } else if (imt >= 25 && imt <= 27) {
        setStatus('Gemuk');
      } else if (imt >= 27) {
        setStatus('Sangat Gemuk');
      }
    return imt;
    }
    
    if(gender === 'M'){
      boybmi.forEach((item :  any) => {
        if(item.age === numberAge * 12){
          if(imt < item.rd5){
            setStatus('Underweight');
          }else if(imt >= item.rd5 && imt <= item.rd85){
            setStatus('Healthy Weight');
          }else if(imt >= item.rd85 && imt <= item.rd95){
            setStatus('At risk of overweight');
          }else if(imt >= item.rd95){
            setStatus('Overweight');
          }
          
        }
      }
      )
    }else{
      girlbmi.forEach((item : any) => {
        if(item.age === numberAge * 12){
          if(imt < item.rd5){
            setStatus('Underweight');
          }else if(imt >= item.rd5 && imt <= item.rd85){
            setStatus('Healthy Weight');
          }else if(imt >= item.rd85 && imt <= item.rd95){
            setStatus('At risk of overweight');
          }else if(imt >= item.rd95){
            setStatus('Overweight');
          }
          
        }
      })
    }

    return imt;
  }

  const resetInput = () => {
    setName('');
    setWeight('');
    setHeight('');
    setAge('');
    setImt(0);
    setStatus('');
    setGender('');
  }

  const renderHasil = () => {
    if (imt > 0 && status !== '') {
      return (
        <View> 
          <GaugeChart value={imt} max={40} />
        </View>
      );
    } else {
      return <Text style={styles.textColor}>Input data secara lengkap</Text>;
    }
  }

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  
  return (
    <ScrollView>
    <View style={styles.containerMain}>
      <View style={{display : 'flex', alignItems : 'center', flexDirection : 'row', margin : 'auto'}}>
        <Image source={require('../../assets/images/logo/kemendikbud.png')} style={{width : 40, height : 40, marginRight : 10}} />
        <Image source={require('../../assets/images/logo/upn.png')} style={{width : 42, height : 42, marginRight: 10}} />
        <Image source={require('../../assets/images/logo/blu.png')} style={{width : 56, height : 40, marginRight: 10}} />
        <Image source={require('../../assets/images/logo/kampusmerdeka.png')} style={{width : 63 , height : 32, marginRight : 10}} />
      </View>
      <View>
        <Text style={{textAlign:'center', marginBottom : 10, marginTop : 20, fontWeight : 'bold'}}>Penelitian RISCOP : Pengembangan sistem intervensi dan pemantauan digital kualitas tidur untuk mencegah obesitas pada remaja</Text>
        <Text style={{textAlign:'center', marginBottom : 30, marginTop : 10, fontWeight : 'bold'}}>Ns. Nourmayansa Vidya A, M. Kep., Sp. Kep. Kom. NIDN : 0307028803</Text>
      </View>
      <Text style={styles.headerText}>Perhitungan IMT</Text>
      <Text style={styles.textColor}>Nama</Text>
      <TextInput placeholder='Masukan Nama' style={styles.formStyle} onChangeText={newText => setName(newText)} defaultValue={name} />
      <View style={styles.flex}>
        <View style={styles.formSub}>
        <Text style={styles.textColor}>Tinggi Badan</Text>
        <TextInput placeholder='0 cm' style={styles.formStyle} onChangeText={newText => setHeight(newText)} defaultValue={height} />
        </View>
        <View style={styles.formSub}>
        <Text style={styles.textColor}>Berat Badan</Text>
        <TextInput placeholder='0 kg' style={styles.formStyle} onChangeText={newText => setWeight(newText)} defaultValue={weight}  />
        </View>
        <View style={styles.formSub}>
        <Text style={styles.textColor}>Usia</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          searchPlaceholder="Usia..."
          value={age}
          onChange={item => {
            setAge(item.value);
          }}
        />
        </View>
      </View>
      <Text style={styles.textColor}>Jenis Kelamin</Text>
      <RadioGroup layout='row' labelStyle={styles.radioStyle} radioButtons={radioButton} onPress={setGender} selectedId={gender} />
      <View style={styles.flex}>
      <TouchableHighlight underlayColor="#e0e0e0" style={styles.buttonReset} onPress={() => resetInput()}>
        <Text style={[styles.textColor, styles.centerText]}>Reset</Text>
      </TouchableHighlight>
      <TouchableHighlight underlayColor="#e0e0e0" style={styles.buttonImt} onPress={() => calculateIMT()}>
        <Text style={[styles.textColorWhite, styles.centerText]}>Hitung</Text>
      </TouchableHighlight>
      </View>
      <View style={styles.chartStyle}>
      {renderHasil()}
      </View>
    </View>
    </ScrollView>
  );
}

