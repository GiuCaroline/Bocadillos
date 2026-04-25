import { View, Text, TouchableOpacity } from 'react-native';
import { Input } from '../components/input'; 
import { Envelope, Key } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

export function Login() {
  const navigation = useNavigation();
    return(
        <View className="flex-1 items-center justify-center bg-marron">
            <View className='flex-row'>
                <Text className="text-laranja text-4xl font-montserrat-extrabold">BOCA</Text>
                <Text className="text-branco text-4xl font-montserrat-extrabold">DILLOS</Text>
            </View>

            <Input icon={Envelope} placeholder={"Email"} keyboardType="email-address"/>
            <Input seguranca={true} icon={Key} placeholder={"Senha"}/>
            
            <View className='w-[79%]'>
                <Text className="font-montserrat-light text-[12px] text-branco mt-[-2%] mb-[10%]"
                onPress={() => navigation.navigate('Esqueci')}>
                Esqueci minha senha
                </Text>
            </View>


            <TouchableOpacity
                className='bg-laranja rounded-full py-3 w-[15rem] items-center'
                onPress={() => navigation.navigate('Home')}
                activeOpacity={0.8}
            >
                <Text className='text-[16px] text-branco font-montserrat'>Entrar</Text>
            </TouchableOpacity>
            
        </View>
    )
}