import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../utils/constance';

type ButtonProps = {
  onButtonPress: () => void;
  text: string;
};

const Button: React.FC<ButtonProps> = ({onButtonPress, text}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onButtonPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    backgroundColor: COLORS.thirdary,
    left: '32%',
    right: '32%',
    paddingHorizontal: 5,
    paddingVertical: 15,
    borderRadius: 50,
    bottom: 61,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
});
