import { Link } from "expo-router";
import { View, Text } from "react-native";

export default function NotFound() {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
            <Text style={{ fontSize: 22, fontWeight: "600", marginBottom: 8 }}>Screen not found</Text>
            <Link href="/" style={{ fontSize: 16 }}>Go to home</Link>
        </View>
    );
}