import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const Button = ({ title, onPress, disabled = false, style, textStyle }: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.buttonDisabled, style]}
      onPress={disabled ? undefined : onPress}
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
    >
      <Text
        style={[styles.buttonText as TextStyle, disabled && styles.buttonTextDisabled, textStyle]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#9bbcf3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonTextDisabled: {
    opacity: 0.75,
  },
});
