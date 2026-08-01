
import { useQuery } from "@tanstack/react-query";

import { enrichIP } from "@/lib/services/intelligence";

export function useIPIntel(ip: string) {

    return useQuery({

        queryKey: ["intel", ip],

        queryFn: () => enrichIP(ip),

        enabled: !!ip,

    });

}