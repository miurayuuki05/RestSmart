import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Defs, LinearGradient, Stop } from 'react-native-svg';

interface GaugeChartProps {
  value: number;
  max: number;
  radius?: number;
}

const GaugeChart: React.FC<GaugeChartProps> = ({ value, max, radius = 100 }) => {
  const percentage = Math.min(value / max, 1); // Ensure percentage doesn't exceed 100%
  const circumference = Math.PI * radius;
  const strokeDasharray = circumference * percentage;
  const strokeWidth = 50;
  const center = radius + strokeWidth / 2;
  const diameter = radius * 2 + strokeWidth;

  // Determine the color based on the value
  let gradientId = 'default';
  let gradientColors = ['#4caf50', '#4caf50']; // Default to green
  
  if (value < 18.5) {
    gradientId = 'underweight';
    gradientColors = ['#ffeb3b', '#ffeb3b']; // Yellow
  } else if (value >= 18.5 && value <= 24.9) {
    gradientId = 'healthy';
    gradientColors = ['#4caf50', '#4caf50']; // Green
  } else if (value >= 25 && value <= 30) {
    gradientId = 'overweight';
    gradientColors = ['#ffeb3b', '#ffeb3b']; // Yellow
  } else {
    gradientId = 'obese';
    gradientColors = ['#f44336', '#f44336']; // Red
  }

  return (
    <SafeAreaView>
    <View style={styles.container}>
      <Text style={styles.title}>Hasil IMT</Text>
      <View style={{height : diameter / 2, width : diameter, overflow: 'hidden'}}>
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
          d={`M ${center} ${center} m ${-radius} 0 a ${radius} ${radius} 0 1 1 ${2 * radius} 0 a ${radius} ${radius} 0 1 1 ${-2 * radius} 0`}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${strokeDasharray} ${circumference - strokeDasharray}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`} // Rotate to align start of the path
        />
        {/* BMI text */}
      </Svg>
      </View>
      <Text style={styles.boldText}>
          {`${Math.round(value)} `}
      </Text>
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
  },
  title: {
    marginBottom: 20,
    fontSize: 18, // Adjusted font size for better readability
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GaugeChart;