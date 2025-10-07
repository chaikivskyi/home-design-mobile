import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useColorScheme } from 'react-native';
import { AuthProvider } from "@/features/auth/contexts/AuthContext";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();

const toastConfig = {
    success: (props: any) => (
        <BaseToast
            {...props}
            style={{ borderLeftColor: "#22c55e" }}
            contentContainerStyle={{ paddingHorizontal: 12 }}
            text1Style={{ fontSize: 16, fontWeight: "600" }}
            text2Style={{ fontSize: 14 }}
            text1NumberOfLines={props.text1NumberOfLines ?? 5}
            text2NumberOfLines={props.text2NumberOfLines ?? 8}
        />
    ),
    error: (props: any) => (
        <ErrorToast
            {...props}
            style={{ borderLeftColor: "#ef4444" }}
            text1Style={{ fontSize: 16, fontWeight: "700" }}
            text2Style={{ fontSize: 14 }}
            text1NumberOfLines={props.text1NumberOfLines ?? 5}
            text2NumberOfLines={props.text2NumberOfLines ?? 8}
        />
    ),
};

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({});

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: 2, staleTime: 60_000 },
            mutations: { retry: 0 },
        },
    });

    return (
        <ThemeProvider value={DefaultTheme}>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <Stack screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="(tabs)" />
                        <Stack.Screen name="+not-found" />
                    </Stack>
                    <Toast config={toastConfig} />
                </AuthProvider>
                <StatusBar style="auto" />
            </QueryClientProvider>
        </ThemeProvider>
    );
}