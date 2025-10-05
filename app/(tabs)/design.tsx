import { View, Text } from "react-native";

export default function DesignScreen() {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 8 }}>
            <Text style={{ fontSize: 24, fontWeight: "600" }}>Design</Text>
            <Text>Put your UI here.</Text>
        </View>
    );
}
