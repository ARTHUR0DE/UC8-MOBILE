import { Stack } from "expo-router";


export default function ProductsLayout(){
    return(
        <Stack>
            <Stack.Screen name="index" options={{title: 'Produtos'}}/>
        </Stack>
    )
}