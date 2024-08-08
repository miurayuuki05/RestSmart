import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { Linking } from 'react-native';

interface GaugeChartProps {
  value: number;
  max: number;
  radius?: number;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ value, max, radius = 100 }) => {
  const percentage = Math.min(value / max, 1); // Ensure percentage doesn't exceed 100%
  const circumference = Math.PI * radius;
  const strokeDasharray = circumference * percentage;
  const strokeWidth = 35;
  const center = radius + strokeWidth / 2;
  const diameter = radius * 2 + strokeWidth;
  let level = '';

  // Determine the color based on the value
  let gradientId = 'default';
  let gradientColors = ['#4caf50', '#4caf50']; // Default to green
  
  if (value < 18.5) {
    gradientId = 'underweight';
    gradientColors = ['#ffeb3b', '#ffeb3b']; // Yellow
    level = 'Underweight';
  } else if (value >= 18.5 && value <= 24.9) {
    gradientId = 'healthy';
    gradientColors = ['#4caf50', '#4caf50']; // Green
    level = 'Healthy';
  } else if (value >= 25 && value <= 30) {
    gradientId = 'overweight';
    gradientColors = ['#ffeb3b', '#ffeb3b']; // Yellow
    level = 'Overweight';
  } else {
    gradientId = 'obese';
    gradientColors = ['#f44336', '#f44336']; // Red
    level = 'Obese'; 
  }

  return (
    <SafeAreaView>
    <View style={styles.container}>
      <Text style={styles.title}>Hasil IMT</Text>
      <View style={{height : diameter / 2.4, width : diameter, overflow : 'hidden'}}>
      <Svg
        width={diameter}
        height={diameter}
        viewBox={`0 0 ${diameter} ${diameter}`}
      >
        <Defs>
          <LinearGradient id="underweight" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#ffeb3b" />
            <Stop offset="100%" stopColor="#ffeb3b" />
          </LinearGradient>
          <LinearGradient id="healthy" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#4caf50" />
            <Stop offset="100%" stopColor="#4caf50" />
          </LinearGradient>
          <LinearGradient id="overweight" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#ffeb3b" />
            <Stop offset="100%" stopColor="#ffeb3b" />
          </LinearGradient>
          <LinearGradient id="obese" x1="0%" y1="0%" x2="100%" y2="100%">
            <Stop offset="0%" stopColor="#f44336" />
            <Stop offset="100%" stopColor="#f44336" />
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
        {level}
      </Text>
      <View style={styles.tipscontainer}>
        <Text style={styles.tipstitles}>
          Tips : 
        </Text>
        <Text style={[styles.whitetext]}>
          Konsumsi makanan yang kaya akan protein
        </Text>
        <Text style={{color: 'blue', textDecorationLine : 'underline', fontSize : 12, textAlign: 'center'}} onPress={() => Linking.openURL('https://www.alodokter.com/cermat-memilih-makanan-yang-mengandung-protein')}>
          Pelajari lebih lanjut
        </Text>
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
    color: 'white',
  },
  tipsdesc: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
    color: 'white',
  },
  whitetext: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
    color: 'white',
  },
});

export default GaugeChart;