export type Props = {
    value: number;
    max: number;
    size: number;
    strokeWidth: number;
}
import React from "react";
import Svg, {Path, Circle} from "react-native-svg";
import { View, Text } from "react-native";

export function Gauge({value, max, size, strokeWidth}: Props) {
    const radius = size / 2 - strokeWidth / 2;
    const circumference = Math.PI * radius;
  
    const strokeDashoffset = circumference - (value / max) * circumference;
    return (
        <View style={{width: size, height: size / 2 }}>
            <Svg width={size} height={size / 2} viewBox={`0 0 ${size} ${size / 2}`}>
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke="#e6e6e6"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
              />
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke="#3b5998"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </Svg>
            <Text>{value}</Text>
        </View>
    );
}