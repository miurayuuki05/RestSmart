import { Image, StyleSheet, Platform, Button, Pressable } from 'react-native';

import React from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { View, Text, TextInput } from 'react-native';
import { useState, useMemo } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { RadioGroup } from 'react-native-radio-buttons-group';
import { Appearance } from 'react-native';
import boybmi from '../../databmi/boybmi.json';
import girlbmi from '../../databmi/girlbmi.json';
import Svg, {Path, Circle} from "react-native-svg";

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

let styles : any;

if (colorScheme === 'dark') {
  styles = StyleSheet.create({
    centerText : {
      textAlign : 'center'
    },
    containerMain: {
      paddingTop: 70,
      paddingHorizontal: 30,
    },
    headerText: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 50,
    },
    textColor: {
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
      color: 'white',
    },
    selectedTextStyle: {
      color: 'white',
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    iconStyle: {
      color: 'white',
    },
    radioStyle: {
      display: 'flex',
      justifyContent: 'flex-start',
      color: 'white'
    },
    formStyle : {
      height: 40, 
      borderColor: 'gray', 
      borderWidth: 1, 
      color:'white',
      borderRadius : 5,
      marginBottom : 30,
    },
    flex : {
      display : 'flex',
      flexDirection : 'row',
      justifyContent : 'space-between'
    },
    buttonReset : {
      backgroundColor : '#575956',
      color : 'white',
      marginTop : 10,
      shadowColor: 'white',
      shadowOffset: { width: 5, height: 10 },
      shadowOpacity: 1,
      shadowRadius: 10,
      width : '45%',
      padding : 5
    },
    buttonImt : {
      backgroundColor : '#575956',
      color : 'white',
      marginTop : 10,
      shadowColor: 'white',
      shadowOffset: { width: 5, height: 10 },
      shadowOpacity: 1,
      shadowRadius: 10,
      width : '45%',
      padding : 5
    },
    formSub : {
      width : '30%',
    }
  });
  
}else{
  styles = StyleSheet.create({
    containerMain: {
      paddingTop: 70,
      paddingHorizontal: 30,
    },
    headerText: {
      color: 'black',
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 50,
    },
    textColor: {
      color: 'black',
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
      paddingLeft : 5,
      marginBottom : 30,
      borderRadius : 5,
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
      borderRadius : 5,      
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
      backgroundColor : '#a0a0ff',
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
      borderRadius : 5,
    },
    centerText : {
      textAlign : 'center'
    },
    formSub : {
      width : '30%',
    }
  });
}

export default function HomeScreen() {

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

  const calculateIMT = () => {
    const numberWeight = Number(weight);
    const numberHeight = Number(height);
    const numberAge = Number(age);

    let imt = 0;
    if (isNaN(numberWeight) || isNaN(numberHeight) || numberHeight === 0 || name === '' || age === '') {
      return 'Input Data Anda';
    }

    imt = numberWeight / ((numberHeight / 100) * (numberHeight / 100));
    setImt(imt);
    
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
      boybmi.forEach((item) => {
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
      girlbmi.forEach((item) => {
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

  const renderHasil = () => {
    if (imt > 0 && status !== '') {
      return (
        <View>
          <Text style={styles.textColor}>IMT</Text>
          <Text style={styles.textColor}>{imt}</Text>
          <Text style={styles.textColor}>Status</Text>
          <Text style={styles.textColor}>{status}</Text>
        </View>
      );
    } else {
      return <Text style={styles.textColor}>Input Data Secara Lengkap</Text>;
    }
  }
  return (
    <View style={styles.containerMain}>
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
      <Pressable style={styles.buttonReset} onPress={() => calculateIMT()}>
        <Text style={[styles.textColor, styles.centerText]}>Reset</Text>
      </Pressable>
      <Pressable style={styles.buttonImt} onPress={() => calculateIMT()}>
        <Text style={[styles.textColor, styles.centerText]}>Hitung</Text>
      </Pressable>
      </View>
      {renderHasil()}
    </View>
  );
}

