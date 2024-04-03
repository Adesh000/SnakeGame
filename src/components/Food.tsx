import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Coordinate} from '../types/types';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';

interface FoodProps {
  food: Coordinate;
}

const Food = ({food}: FoodProps) => {
  const radius = useSharedValue(0);
  useEffect(() => {
    radius.value = withRepeat(withSpring(1), 0, true);
  }, []);
  const animatedCircle = useAnimatedStyle(() => {
    return {
      transform: [{scale: radius.value}],
    };
  });
  const foodPosition = {
    left: food.x * 10,
    top: food.y * 10,
  };

  return (
    <Animated.View
      style={[styles.foodContainer, foodPosition, animatedCircle]}
    />
  );
};

export default Food;

const styles = StyleSheet.create({
  foodContainer: {
    width: 20,
    height: 20,
    borderRadius: 15,
    backgroundColor: 'tomato',
    position: 'absolute',
    left: 5,
    top: 20,
  },
});
