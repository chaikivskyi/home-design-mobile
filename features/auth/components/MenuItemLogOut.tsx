import { Alert, Platform, Pressable, Text } from "react-native";
import { LogOut } from "lucide-react-native";
import { useAuthContext } from "@/features/auth/contexts/AuthContext";
import { toastError } from "@/utils/toast";
import {useRouter} from "expo-router";

export const MenuItemLogOut = () => {
    const { logout } = useAuthContext();
    const router = useRouter();

    const confirmLogout = async () => {
        try {
            if (Platform.OS === "web") {
                const ok = window.confirm("Are you sure you want to log out?");

                if (ok) {
                    await logout();
                    router.replace('/auth');
                }

                return;
            }

            Alert.alert("Log out", "Are you sure you want to log out?", [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Log out",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await logout();
                            router.replace('/auth');
                        } catch (e) {
                            const msg = e instanceof Error ? e.message : "Logout failed";
                            toastError(msg);
                        }
                    },
                },
            ]);
        } catch (e) {
            const msg = e instanceof Error ? e.message : "Logout failed";
            toastError(msg);
        }
    };

    return (
        <Pressable
            onPress={confirmLogout}
            style={({ pressed }) => ({
                flexBasis: 110,
                flexGrow: 0,
                flexShrink: 0,
                opacity: pressed ? 0.7 : 1,
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 10,
                borderRadius: 12,
                backgroundColor: "#FEE2E2",
            })}
        >
            <LogOut size={22} color="#B91C1C" />
            <Text style={{ fontSize: 12, color: "#B91C1C", marginTop: 2 }}>Logout</Text>
        </Pressable>
    );
};
