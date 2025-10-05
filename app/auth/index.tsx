import {Redirect} from 'expo-router';
import {useAuthContext} from "@/features/auth/contexts/AuthContext";
import AuthForm from '@/features/auth/components/AuthForm';

export default function AuthScreen() {
    const {authenticated} = useAuthContext();

    if (authenticated === true) {
        return <Redirect href="/"/>
    }

    return <AuthForm/>;
}
