import { Text, View, ScrollView } from "react-native";
import { NavTop } from "../components/navTop";
import { Nav } from "../components/nav";

export function Home(){
    return(
        <View className='flex-1 bg-background'>
            <NavTop/>
            <ScrollView contentContainerStyle={{ padding: 10,  paddingBottom: 95 }} className='flex'>
            </ScrollView>
            <Nav/>
        </View>
    )
}