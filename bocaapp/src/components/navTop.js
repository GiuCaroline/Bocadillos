import { Text, TouchableOpacity, View } from "react-native";
import { ShoppingCart } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

export function NavTop(){
  const navigation = useNavigation();
    return(
        <View className='bg-marron w-full h-[100px] justify-end px-[2%] pb-4'>
            <View className='flex-row items-center justify-between px-[2%]'>
                <Text className="text-laranja text-3xl font-montserrat-extrabold">BOCA
                    <Text className='text-branco'>DILLOS</Text>
                </Text>

                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    activeOpacity={0.9}
                >
                    <ShoppingCart className='' color="#FAFAFA" size={26} />
                </TouchableOpacity>
            </View>
        </View>
    )
}