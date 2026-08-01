
import { api } from "@/lib/api";

export async function enrichIP(ip: string) {

    const response = await api.get(
        `/intelligence/ip/${ip}`
    );

    return response.data;

}