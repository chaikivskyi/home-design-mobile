import Toast from "react-native-toast-message";

export const toastSuccess = (title: string, desc?: string) =>
    Toast.show({ type: "success", text1: title, text2: desc, position: "top" });

export const toastError = (title: string, desc?: string) =>
    Toast.show({ type: "error", text1: title, text2: desc, position: "top" });