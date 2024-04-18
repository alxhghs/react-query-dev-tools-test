import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import {
    QueryClientProvider,
    QueryClient,
    useQuery,
} from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";

export default function App() {
    const client = new QueryClient();
    useReactQueryDevTools(client);
    return (
        <QueryClientProvider client={client}>
            <View style={styles.container}>
                <Text>Open up App.tsx to start working on your app!</Text>
                <Child />
                <StatusBar style="auto" />
            </View>
        </QueryClientProvider>
    );
}

const Child = () => {
    const { data } = useQuery({
        queryKey: ["coffee"],
        queryFn: async () => {
            return await fetch("https://api.sampleapis.com/beers/ale").then((res) => res.json());
        },
    });
    const { data: otherQuery } = useQuery({
        queryKey: ["games"],
        queryFn: async () => {
            return await fetch("https://api.sampleapis.com/switch/games").then((res) => res.json());
        },
    });
    console.log(JSON.stringify(data, null, 2))
    console.log(JSON.stringify(otherQuery, null, 2))
    return <Text>{JSON.stringify(otherQuery)}</Text>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
