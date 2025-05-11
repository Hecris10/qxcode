import { fetchTags } from "@/config/tags"
import { client } from "@/lib/client"
import { useQuery } from "@tanstack/react-query"

export const useGetUserLogos = () => {

    const { data, refetch, isLoading } = useQuery({
        queryKey: [fetchTags.logos,],
        queryFn: async () => {
            try {
                const res = await client.logo.get.$get()
                if (!res.ok) throw new Error("Error fetching logos")
                const data = await res.json()
                return data
            }
            catch (error) {
                console.error("Error fetching logos", error)
                throw error
            }
        }

    })

    return {
        logos: data || [],
        isLoadingLogos: isLoading,
        refetchLogos: refetch,

    }


}