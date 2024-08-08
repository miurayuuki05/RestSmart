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
  }
});

export default function TabTwoScreen() {
  const [quiz, setQuiz] = React.useState(false);
  const [questionNumber, setQuestionNumber] = React.useState(1);
  let finalquestion = 5;  
  const [scoreArray, setScoreArray] = React.useState([0,0,0,0,0]);
  const [sleepQuality, setSleepQuality] = React.useState('');
  const [totalScore, setTotalScore] = React.useState(0);
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const questions = useMemo(() => [
    {
      question: 'Apakah Anda merasa tidur Anda berkualitas?',
      answers: [
        { answer: 'Ya', value: 1 , choose : false},
        { answer: 'Tidak', value: 0 , choose : false},
      ],
    },
    {
      question: 'Berapa lama anda tidur?',
      answers: [
        { answer: 'Kurang dari 3 jam', value: 1, choose : false },
        { answer: '3-5 jam', value: 2 , choose : false},
        { answer: '5-8 jam', value: 3 , choose : false},
        { answer: 'Lebih dari 8 jam', value: 4 , choose : false},
      ],
    },
    {
      question: 'Apakah Anda merasa segar saat bangun tidur?',
      answers: [
        { answer: 'Ya', value: 1, choose : false },
        { answer: 'Tidak', value: 0, choose : false },
      ],
    },
    {
      question: 'Apakah Anda merasa lelah saat bangun tidur?',
      answers: [
        { answer: 'Ya', value: 0 , choose : false},
        { answer: 'Tidak', value: 1, choose : false },
      ],
    },
    {
      question: 'Apakah Anda merasa kantuk saat siang hari?',
      answers: [
        { answer: 'Ya', value : 0, choose : false },
        { answer: 'Tidak', value : 1, choose : false },
      ],
    },
  ]
  , []);


  const handleQuizChange = () => {
    setQuestionNumber(1);
    setScoreArray([0,0,0,0,0]);
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
        {questions[questionNumber - 1].answers.map((answer, index) => (
          <TouchableHighlight underlayColor="#a0a0a0" style={styles.radioButton} key={index} onPress={() => handleScore(answer.value)}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {questions[questionNumber - 1].answers[index].choose ?
              <Ionicons name="radio-button-on" size={24} color="black" />
              :
              <Ionicons name="radio-button-off" size={24} color="black" />
              }
              <Text style={styles.radioText}>
                {answer.answer}
              </Text>
            </View>
          </TouchableHighlight>
        ))}
        {questionNumber > 1 ? (
        <TouchableHighlight underlayColor="#a0a0a0" style={styles.btnsleep} onPress={prevQuestion}>
          <Text style={{color: 'white', textAlign: 'center'}}>
            Sebelumnya
          </Text>
        </TouchableHighlight>
        ) : null}
        {questionNumber < finalquestion  ? (
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
