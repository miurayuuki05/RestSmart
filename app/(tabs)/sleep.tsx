import { StyleSheet, Image, Platform } from 'react-native';
import { View, Text, TextInput, ScrollView, TouchableHighlight} from 'react-native';
import React, { useMemo, useReducer } from 'react';
import { Ionicons } from '@expo/vector-icons';
import SleepGaugeChart from '@/components/SleepGauge';
import AsyncStorage from '@react-native-async-storage/async-storage';

const mainColor = '#e96f0a';

const styles = StyleSheet.create({
  containerMain: {
    paddingTop: 70,
    paddingHorizontal: 30,
    marginBottom : 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  titleQuiz: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  progressBar : {
    height: 6,
    backgroundColor: 'black',
    borderRadius: 10,
    marginBottom: 20,
  },
  progressFill : {
    height: 6,
    backgroundColor: mainColor,
    borderRadius: 10,
  },
  textdesc: {
    fontSize: 20,
    textAlign: 'justify',
  },
  btnsleep : {
    backgroundColor: mainColor,
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    textAlign : 'center',
    shadowColor: "#000",
    shadowOffset: {
	  width: 0,
	  height: 4,
    } ,
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  radioButton : {
    backgroundColor : '#fff',
    color : 'black',
    marginTop : 10,
    borderRadius : 10,      
    width : '100%',
    padding : 10,
    shadowColor: "#000",
    shadowOffset: {
	  width: 0,
	  height: 4,
    } ,
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  radioText : {
    color: 'black',
  },
  textInputContainer : {
    backgroundColor : '#fff',
    marginTop : 10,
    borderRadius : 10,      
    width : '100%',
    padding : 10,
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 4,
    } ,
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  textInput : {
    color: 'black',
  },
});

export default function TabTwoScreen() {
  const [quiz, setQuiz] = React.useState(false);
  const [questionNumber, setQuestionNumber] = React.useState(1);
  let finalquestion = 18;  
  const [scoreArray, setScoreArray] = React.useState([0,0,0,0,0]);
  const [sleepQuality, setSleepQuality] = React.useState('');
  const [totalScore, setTotalScore] = React.useState(0);
  const [, forceUpdate] = useReducer(x => x + 1, 0);  
  const [initQuest, setInitQuest] = React.useState(0);
  const [textInputValue, setTextInputValue] = React.useState('');
  const [quest1 , setQuest1] = React.useState('');
  const [quest2 , setQuest2] = React.useState('');

  const handleTextInputChange = (text : string) => {
    setTextInputValue(text);
  }

  const submitHour = (text : string, questionNumber : number) => {
    if(questionNumber === 1){
      setQuest1(text);
    }else{
      setQuest2(text);
    }
    setTextInputValue('');
    nextQuestion();
  }



  const questions = useMemo(() => [
    {
      question: '1.	Selama sebulan yang lalu, jam berapa Anda bisanya mulai tidur dimalam hari? Jam',
      answers : [
      ],
      type: 'text',
    },
    {
      question: '2.	Selama sebulan yang lalu, berapa menit Anda habiskan waktu ditempat tidur, sebelum akhirnya Anda tertidur?',
      answers: [
        { answer: '15 Menit/Kurang', value: 1 , choose : false},  
        { answer: '16-30 Menit', value: 2 , choose : false},
        { answer: '31-60 Menit', value: 3 , choose : false},
        { answer: 'Lebih dari 60 Menit', value: 4 , choose : false},
      ],        
      type: 'radio',
    },
    {
      question: '3.	Selama sebulan yang lalu, jam berapa Anda biasanya bangun disetiap pagi? Jam',
      answers: [
      ],
      type: 'text',
    },
    {
      question: '4.	Selama sebulan yang lalu, berapa jam Anda tidur pulas di malam hari?',
      answers: [
        { answer: 'Lebih dari 7 jam', value: 1 , choose : false},
        { answer: '6-7 jam', value: 2 , choose : false},
        { answer: '5-6 jam', value: 3 , choose : false},
        { answer: 'Kurang dari 5 jam', value: 4 , choose : false},
      ], 
      type: 'radio',     
    },
    {
      question: '5.	Tidak dapat tidur selama 30 menit',
      answers: [
        { answer : 'Tidak Pernah', value : 1, choose : false},
        { answer : '1 Kali Seminggu', value : 2, choose : false},
        { answer : '2 Kali Seminggu', value : 3, choose : false},
        { answer : '3 Kali Seminggu/lebih', value : 4, choose : false},
      ],
      type: 'radio',
    },
    {
      question: '6.	Bangun tidur di tengah malam atau bangun pagi terlalu cepat',
      answers: [
        { answer : 'Tidak Pernah', value : 1, choose : false},
        { answer : '1 Kali Seminggu', value : 2, choose : false},
        { answer : '2 Kali Seminggu', value : 3, choose : false},
        { answer : '3 Kali Seminggu/lebih', value : 4, choose : false},
      ],
      type: 'radio',
    },
    {
      question: '7.	Pergi ke kamar mandi di malam hari',
      answers: [
        { answer : 'Tidak Pernah', value : 1, choose : false},
        { answer : '1 Kali Seminggu', value : 2, choose : false},
        { answer : '2 Kali Seminggu', value : 3, choose : false},
        { answer : '3 Kali Seminggu/lebih', value : 4, choose : false},
      ],
      type: 'radio',
    },
    {
      question: '8.	Sulit bernafas secara nyaman',
      answers: [
        { answer : 'Tidak Pernah', value : 1, choose : false},
        { answer : '1 Kali Seminggu', value : 2, choose : false},
        { answer : '2 Kali Seminggu', value : 3, choose : false},
        { answer : '3 Kali Seminggu/lebih', value : 4, choose : false},
      ],
      type: 'radio',
    },
    {
      question: '9.	Batuk atau berdengkur dengan keras',
      answers: [
        { answer : 'Tidak Pernah', value : 1, choose : false},
        { answer : '1 Kali Seminggu', value : 2, choose : false},
        { answer : '2 Kali Seminggu', value : 3, choose : false},
        { answer : '3 Kali Seminggu/lebih', value : 4, choose : false},
      ],
      type: 'radio',
    },
    {
      question: '10.	Merasa kedinginan ', 
      answers: [
        { answer : 'Tidak Pernah', value : 1, choose : false},
        { answer : '1 Kali Seminggu', value : 2, choose : false},
        { answer : '2 Kali Seminggu', value : 3, choose : false},
        { answer : '3 Kali Seminggu/lebih', value : 4, choose : false},
      ],
      type: 'radio',
    },
    {
      question: '11.	Merasa kepanasan',
      answers: [
        { answer : 'Tidak Pernah', value : 1, choose : false},
        { answer : '1 Kali Seminggu', value : 2, choose : false},
        { answer : '2 Kali Seminggu', value : 3, choose : false},
        { answer : '3 Kali Seminggu/lebih', value : 4, choose : false},
      ],
      type: 'radio',
    },
    {
      question: '12.	Mengalami mimpi buruk',
      answers: [
        { answer : 'Tidak Pernah', value : 1, choose : false},
        { answer : '1 Kali Seminggu', value : 2, choose : false},
        { answer : '2 Kali Seminggu', value : 3, choose : false},
        { answer : '3 Kali Seminggu/lebih', value : 4, choose : false},
      ],
      type: 'radio',
    },
    {
      question: '13.	Nyeri di badan',
      answers: [
        { answer : 'Tidak Pernah', value : 1, choose : false},
        { answer : '1 Kali Seminggu', value : 2, choose : false},
        { answer : '2 Kali Seminggu', value : 3, choose : false},
        { answer : '3 Kali Seminggu/lebih', value : 4, choose : false},
      ],
      type: 'radio',
    },
    {
      question: '14.	Gangguan tidur lainnya (misalnya mengompol, berjalan sambal tidur, mudah tertidur dimana saja, dan lain-lain)',
      answers: [
        { answer : 'Tidak Pernah', value : 1, choose : false},
        { answer : '1 Kali Seminggu', value : 2, choose : false},
        { answer : '2 Kali Seminggu', value : 3, choose : false},
        { answer : '3 Kali Seminggu/lebih', value : 4, choose : false},
      ],
      type: 'radio',
    },
    {
      question: '15.	Selama sebulan yang lalu, seberapa sering anda mengonsumsi obat-obatan untuk membantu anda tidur',
      answers: [
        { answer : 'Tidak Pernah', value : 1, choose : false},
        { answer : '1 Kali Seminggu', value : 2, choose : false},
        { answer : '2 Kali Seminggu', value : 3, choose : false},
        { answer : '3 Kali Seminggu/lebih', value : 4, choose : false},
      ],
      type: 'radio',
    },
    {
      question: '16.	Selama sebulan yang lalu, seberapa sering muncul masalah-masalah yang dapat mengganggu anda saat mengendarai kendaraan, makan, atau beraktivitas sosial',
      answers: [
        { answer : 'Tidak Pernah', value : 1, choose : false},
        { answer : '1 Kali Seminggu', value : 2, choose : false},
        { answer : '2 Kali Seminggu', value : 3, choose : false},
        { answer : '3 Kali Seminggu/lebih', value : 4, choose : false},
      ],
      type: 'radio',
    },
    {
      question: '17.	Selama sebulan yang lalu, bagaimana rata-rata kualitas tidur anda',
      answers: [
        { answer : 'Sangat Baik', value : 1, choose : false},
        { answer : 'Baik', value : 2, choose : false},
        { answer : 'Buruk', value : 3, choose : false},
        { answer : 'Sangat Buruk', value : 4, choose : false},
      ],
      type: 'radio',
    },
    {
      question: '18.	Selama sebulan yang lalu, berapa banyak masalah yang membuat anda antusias untuk menyelesaikannya',
      answers: [
        { answer : 'Antusias besar', value : 1, choose : false},
        { answer : 'Antusias sedang', value : 2, choose : false},
        { answer : 'Antusias kecil', value : 3, choose : false},
        { answer : 'Tidak antusias', value : 4, choose : false},
      ],
      type: 'radio',
    }
  ]
  , []);


  const handleQuizChange = () => {
    setQuestionNumber(1);
    setScoreArray([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
    setSleepQuality('');
    setQuiz(!quiz);
  }

  const nextQuestion = () => {
    setQuestionNumber(questionNumber + 1);
  }

  const prevQuestion = () => {
    setQuestionNumber(questionNumber - 1);
  }

  const handleScore = (value : number) => {
    let tempArray = scoreArray;
    tempArray[questionNumber - 1] = value;
    setScoreArray(tempArray)
    let tempQuestion = questions;
    tempQuestion[questionNumber - 1].answers.map((answer, index) => {
      tempQuestion[questionNumber - 1].answers[index].choose = false;
    });
    tempQuestion[questionNumber - 1].answers.map((answer, index) => {
      if(answer.value === value){
        tempQuestion[questionNumber - 1].answers[index].choose = true;
      }
    });
    forceUpdate();
  }

  const handleResult = async () => {
    
    let score = 0;
    scoreArray.map((value) => {
      score += value;
    });
    setTotalScore(score);
    if(score < 3){
      setSleepQuality('Tidur Anda tidak berkualitas');
    }else{
      setSleepQuality('Tidur Anda berkualitas');
    }

    await AsyncStorage.setItem('sleepQuality', sleepQuality);
    await AsyncStorage.setItem('sleepScore', score.toString());
    forceUpdate();
    setQuiz(!quiz);
  }

  const renderHasil = () => {
    if(sleepQuality !== ''){
      return (
        <View style={{padding: 10, marginTop: 20}}>
          <SleepGaugeChart value={totalScore} max={8} />
        </View>
      );
    }else{
      return null;
    }
  }

  if(quiz) {
    return (
      <ScrollView>
      <View style={styles.containerMain}>
        <Text style={styles.titleQuiz}>
          Kualitas Tidur
        </Text>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, {width: `${(questionNumber / finalquestion) * 100}%`}]}></View>
        </View>
        <Text style={styles.textdesc}>
          {questions[questionNumber - 1].question}
        </Text>
        
        {questions[questionNumber - 1].type === 'radio' ? (
          questions[questionNumber - 1].answers.map((answer, index) => (
            <TouchableHighlight
              underlayColor="#a0a0a0"
              style={styles.radioButton}
              key={index}
              onPress={() => handleScore(answer.value)}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {questions[questionNumber - 1].answers[index].choose ? (
                  <Ionicons name="radio-button-on" size={24} color="black" />
                ) : (
                  <Ionicons name="radio-button-off" size={24} color="black" />
                )}
                <Text style={styles.radioText}>{answer.answer}</Text>
              </View>
            </TouchableHighlight>
          ))
        ) : (
          <View>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Your answer"
              onChangeText={(text) => handleTextInputChange(text)}
              value={textInputValue}
            />
            <Text style={{color: 'black', fontSize: 12, marginTop: 5}}>
              {questionNumber === 1 ? 'Contoh : 22:00' : 'Contoh : 7:00'}
            </Text>
          </View>
          <TouchableHighlight underlayColor="#a0a0a0" style={styles.btnsleep} onPress={() => submitHour(textInputValue, questionNumber)}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              Selanjutnya
            </Text>
          </TouchableHighlight>
          </View>
        )}

        {questionNumber > 1 ? (
        <TouchableHighlight underlayColor="#a0a0a0" style={styles.btnsleep} onPress={prevQuestion}>
          <Text style={{color: 'white', textAlign: 'center'}}>
            Sebelumnya
          </Text>
        </TouchableHighlight>
        ) : null}
        {(questionNumber < finalquestion && questionNumber !== 1 && questionNumber !== 3)  ? (
        <TouchableHighlight underlayColor="#a0a0a0" style={styles.btnsleep} onPress={nextQuestion}>
          <Text style={{color: 'white', textAlign: 'center'}}>
            Selanjutnya
          </Text>
        </TouchableHighlight>
        ) : null}
        {questionNumber === finalquestion ? (
          <TouchableHighlight underlayColor="#a0a0a0" style={styles.btnsleep} onPress={handleResult}>
            <Text style={{color: 'white', textAlign: 'center'}}>
              Selesai
            </Text>
          </TouchableHighlight>
        ) : null}
      </View>
    </ScrollView>
    );
  }else{
  return (
    <ScrollView>
      <View style={styles.containerMain}>
        <Text style={styles.title}>
          Kualitas Tidur
        </Text>
        <Text style={styles.textdesc}>
          Lorem ipsum dolor sit amet consectetur. Sit scelerisque sagittis in quam interdum id. Leo nec maecenas lacus consectetur lectus. Elit sed dolor et sapien nulla.
        </Text>
        <TouchableHighlight underlayColor="#a0a0a0" style={styles.btnsleep} onPress={handleQuizChange}>
          <Text style={{color: 'white', textAlign: 'center'}}>
            Mulai
          </Text>
        </TouchableHighlight>
        {sleepQuality === '' ? (
        <View style={{marginTop: 20}}>
          <Text>
            Jumlah soal : {finalquestion}
          </Text>
        </View>
        ) : null}
        {sleepQuality === '' ? (
          <View style={{marginTop: 20}}>
            <Image source={require('../../assets/images/sleepimg.png')} style={{width: '100%', height: 280, marginTop: 20}} />
          </View>
        ) : null}
        <View>
          {renderHasil()}
        </View>
      </View>
    </ScrollView>
  );
  }
}
