import {View, Text} from "react-native";
import { useAuthContext } from "@/features/auth/contexts/AuthContext";
import {Redirect} from 'expo-router';

export default function HomeScreen() {
    const { authenticated } = useAuthContext();

    if (authenticated === false) {
        return <Redirect href="/auth"/>
    }

    return <View>
        <Text>Test</Text>
    </View>
}