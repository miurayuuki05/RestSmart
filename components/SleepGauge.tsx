import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

interface SleepGaugeChartProps {
  value: number;
  max: number;
  radius?: number;
}

const SleepGaugeChart: React.FC<SleepGaugeChartProps> = ({ value, max, radius = 100 }) => {
  const percentage = Math.min(value / max, 1); // Ensure percentage doesn't exceed 100%
  const circumference = Math.PI * radius;
  const strokeDasharray = circumference * percentage;
  const strokeWidth = 35;
  const center = radius + strokeWidth / 2;
  const diameter = radius * 2 + strokeWidth;
  let klasifikasi = '';

  // Determine the color based on the value
  let gradientId = 'default';
  let gradientColors = ['#4caf50', '#4caf50']; // Default to green
  
  if(value < 3){
    gradientId = 'Kualitas Tidur Buruk';
    gradientColors = ['#ffeb3b', '#ffeb3b']; // Yellow
    klasifikasi = 'Buruk';
  }else{
    gradientId = 'Kualitas Tidur Baik';
    gradientColors = ['#4caf50', '#4caf50']; // Green
    klasifikasi = 'Baik';
  }

  return (
    <SafeAreaView>
    <View style={styles.container}>
      <Text style={styles.title}>Hasil Kuesioner</Text>
      <View style={{height : diameter / 2.4, width : diameter, overflow : 'hidden'}}>
      <Svg
        width={diameter}
        height={diameter}
        viewBox={`0 0 ${diameter} ${diameter}`}
      >
        <Defs>
            <LinearGradient id="Kualitas Tidur Buruk" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#ffeb3b" />
                <Stop offset="100%" stopColor="#ffeb3b" />
            </LinearGradient>
            <LinearGradient id="Kualitas Tidur Baik" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#4caf50" />
                <Stop offset="100%" stopColor="#4caf50" />
            </LinearGradient>
        </Defs>
        {/* Background circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke="#e0e0e0"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Gauge arc */}
        <Path
          d={`M ${center} ${center} 
          L ${center - radius} ${center} 
          A ${radius} ${radius} 0 0 1 ${center + radius} ${center} 
          A ${radius} ${radius} 0 0 1 ${center - radius} ${center} 
          Z`}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${strokeDasharray} ${circumference - strokeDasharray}`}
          strokeLinecap="round"
          transform={`rotate(-110 ${center} ${center})`} // Rotate to align start of the path
        />
        {/* BMI text */}
      </Svg>
      </View>
      <Text style={styles.boldText}>
          {`${Math.round(value)} `}
      </Text>
      <Text style={styles.textdesc}>
        Klasifikasi
      </Text>
      <Text style={styles.textlevel}>
        {klasifikasi}
      </Text>      
      <View>
        {value < 3 ?(
            <Text style={{textAlign : 'center'}}>
                Kamu memiliki [klasifikasi], kualitas tidur yang buruk dapat mempengaruhi kesehatan tubuh loh, yuk perbaiki kualitas tidurmu.
            </Text>
        ) : 
        (
            <Text style={{textAlign : 'center'}}>
                Kualitas Tidur Anda Baik, Pertahankan Kualitas Tidur Anda Dengan Cara Berikut :
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in nisi nec libero
            </Text>
        )}
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300, // Adjusted height to fit the expanded gauge
    width: 300,  // Adjusted width to fit the expanded gauge
  },
  boldText : {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    marginBottom: 20,
    fontSize: 18, // Adjusted font size for better readability
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textdesc: {
    fontSize: 12,
    textAlign: 'center',
  },
  textlevel: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  tipscontainer: {
    marginTop: 20,
    backgroundColor: '#FF8A00',
    padding: 15,
    borderRadius: 10,
  },
  tipstitles: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tipsdesc: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default SleepGaugeChart;