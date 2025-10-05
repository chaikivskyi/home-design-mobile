import { useMutation, useQueryClient } from "@tanstack/react-query";
import {apiFetch} from "@/services/api/client";

async function logoutRequest(): Promise<void> {
    await apiFetch("/api/tokens", { method: "DELETE" });
}

export function useLogout() {
    const client = useQueryClient();

    return useMutation({
        mutationFn: logoutRequest,
        onSuccess: async () => {
            client.removeQueries({ queryKey: ["me"], exact: true });
            await client.invalidateQueries();
        },
    });
}