import { useAuthContext } from "@/features/auth/contexts/AuthContext";
import {Redirect} from 'expo-router';

export default function HomeScreen() {
    const { authenticated } = useAuthContext();

    return <Redirect href={authenticated ? '/(tabs)/design' : '/auth' }/>;
}