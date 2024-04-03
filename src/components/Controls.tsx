import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from '../styles/styles';
// import Pause from 'react-native-vector-icons/FontAwesome';
interface ControlProps {
  moving: () => void;
  score: number;
}
const Controls = ({moving, score}: ControlProps) => {
  return (
    <View style={styles.mainContainer}>
      <View>
        <Text>User Details</Text>
      </View>
      <TouchableOpacity style={styles.controlButton} onPress={moving}>
        <Text style={styles.buttonText}>Play</Text>
        {/* <Pause name="pause" size={20} color={'#fff'} /> */}
      </TouchableOpacity>
      <View>
        <Text>Score: {score}</Text>
      </View>
    </View>
  );
};

export default Controls;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
  },
});
