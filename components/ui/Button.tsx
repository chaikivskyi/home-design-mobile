import {StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';

interface ButtonProps {
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
}

export const Button = ({title, onPress, style}: ButtonProps) => {
    return <TouchableOpacity style={style ?? styles.button} onPress={onPress}>
        <Text style={styles.buttonText as TextStyle}>
            {title}
        </Text>
    </TouchableOpacity>;
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});
