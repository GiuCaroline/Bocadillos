import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { NavTop } from "../components/navTop";
import { Nav } from "../components/nav";
import { useNavigation } from '@react-navigation/native';
import { CaretRight } from 'phosphor-react-native';

export function Home(){
  const navigation = useNavigation();
    return(
        <View className='flex-1 bg-background'>
            <NavTop/>
            <ScrollView contentContainerStyle={{ padding: 10,  paddingBottom: 95 }} className='flex px-2'>
                <View style={styles.sombra} className='bg-branco rounded-[30px] justify-center items-center p-4 mt-[4%]'>
                    <Text className='font-montserrat-extrabold text-laranja text-[22px]'>SALGADOS <Text className='text-cinza'>ARTESANAIS</Text></Text>
                    <Text className='font-montserrat text-cinza text-center text-[17px] mt-[2%]'>{`Feitos com carinho,\nfresquinhos todos os dias`}</Text>
                    <TouchableOpacity
                        className='bg-laranja rounded-[20px] p-2 w-[60%] items-center mt-[4%]'
                        onPress={() => navigation.navigate('Loja')}
                        activeOpacity={0.8}
                    >
                        <Text className='text-background font-montserrat'>Ver cardápio completo</Text>
                    </TouchableOpacity>
                </View>

                <View className='mt-[5%]'>
                    <View className='flex-row justify-between items-center'>
                        <Text className='font-montserrat-bold text-[20px]'>Destaques</Text>
                        <TouchableOpacity
                            className='flex-row items-center'
                            onPress={() => navigation.navigate('Loja')}
                            activeOpacity={0.8}
                        >
                            <Text className='font-montserrat text-[14px]'>Ver cardápio</Text>
                            <CaretRight size={20} weight="light" />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <Nav
                active="Home"
                onChange={(r) => navigation.navigate(r)}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    sombra: {
        // iOS
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        // Android
        elevation: 20,
    }
});