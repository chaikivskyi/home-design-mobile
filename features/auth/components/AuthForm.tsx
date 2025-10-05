import {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextStyle} from 'react-native';
import {TextInput} from "@/components/ui/TextInput";
import {Button} from '@/components/ui/Button';
import {useAuthContext} from "@/features/auth/contexts/AuthContext";
import {toastError, toastSuccess} from "@/utils/toast";

export default function AuthForm() {
    const {register, login} = useAuthContext();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const handleAuth = async () => {
        if (!email.trim() || !password.trim()) {
            toastError('Email and password are required');
            return;
        }

        if (isRegistering && password !== confirmPassword) {
            toastError('Passwords do not match');
            return;
        }

        try {
            if (isRegistering) {
                await register(name, email, password, confirmPassword);
            } else {
                await login(email, password);
            }
        } catch (e) {
            toastError(e.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{isRegistering ? 'Sign Up' : 'Login'}</Text>

            {isRegistering && <TextInput
                placeholder='Name'
                placeholderTextColor='#aaa'
                value={name}
                onChangeText={setName}
                autoCapitalize='none'
            />}

            <TextInput
                placeholder='Email'
                placeholderTextColor='#aaa'
                value={email}
                onChangeText={setEmail}
                autoCapitalize='none'
                keyboardType='email-address'
            />

            <TextInput
                placeholder='Password'
                placeholderTextColor='#aaa'
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                textContentType='none'
            />

            {isRegistering && (
                <TextInput
                    placeholder='Confirm Password'
                    placeholderTextColor='#aaa'
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    textContentType='none'
                />
            )}

            <Button title={isRegistering ? 'Sign Up' : 'Login'} onPress={handleAuth}/>

            <TouchableOpacity onPress={() => setIsRegistering(!isRegistering)}>
                <Text style={styles.switchText as TextStyle}>
                    {isRegistering ? 'Already have an account? Login' : 'Don\'t have an account? Sign Up'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    switchText: {
        marginTop: 10,
        color: '#007bff',
        fontSize: 16,
    },
});

