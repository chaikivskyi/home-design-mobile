import React from 'react';
import { TextInput as RNTextInput, StyleSheet } from 'react-native';

interface TexInputProps {
  placeholder: string;
  placeholderTextColor?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?:
    | 'default'
    | 'number-pad'
    | 'decimal-pad'
    | 'numeric'
    | 'email-address'
    | 'phone-pad'
    | 'url';
  textContentType?:
    | 'none'
    | 'username'
    | 'password'
    | 'email'
    | 'name'
    | 'address'
    | 'telephone'
    | 'url';
}

export const TextInput = (props: TexInputProps) => {
  return <RNTextInput style={styles.inputText} {...props} />;
};

const styles = StyleSheet.create({
  inputText: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
    fontSize: 16,
  },
});
