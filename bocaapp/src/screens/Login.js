import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Input } from '../components/input'; 
import { Envelope, Key } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

export function Login() {
  const navigation = useNavigation();
    return(
        <View className="flex-1 items-center justify-center bg-marron">
            <KeyboardAvoidingView 
                className="flex-1 justify-center items-center"
                behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            >
                <Text className="text-laranja text-4xl font-montserrat-extrabold mb-[12%]">BOCA
                    <Text className='text-branco'>DILLOS</Text>
                </Text>

                <Input icon={Envelope} placeholder={"Email"} keyboardType="email-address"/>
                <Input seguranca={true} icon={Key} placeholder={"Senha"}/>
                
                <View className='w-[320px] items-start'>
                    <Text className="font-montserrat-light text-[12px] text-branco mt-[-2%] mb-[20%]"
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

                
                <Text className="font-montserrat-light text-[12px] text-branco mt-[5%]"
                onPress={() => navigation.navigate('Cadastro')}>
                    Não tem uma conta? Faça cadastro clicando <Text className='text-laranja underline'>aqui</Text>
                </Text>
            </KeyboardAvoidingView>
                
        </View>
    )
}