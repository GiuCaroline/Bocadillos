import { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Input } from '../components/input'; 
import { Envelope, Key, User, Phone } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';

export function Cadastro(){
  const navigation = useNavigation();
  const [telefone, setTelefone] = useState('');

    return(
        <View className="flex-1 items-center justify-center bg-marron">
          <KeyboardAvoidingView 
            className="flex-1 justify-center items-center"
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
          >
            <Text className="text-laranja text-4xl font-montserrat-extrabold mb-[12%]">BOCA
                <Text className='text-branco'>DILLOS</Text>
            </Text>
            
            <Input icon={User} placeholder={"Nome"}/>
            <Input icon={Phone} placeholder={"Telefone"} keyboardType="phone-pad"
              value={telefone} 
              onChangeText={(texto) => setTelefone(maskPhone(texto))}
            />
            <Input icon={Envelope} placeholder={"Email"} keyboardType="email-address"/>
            <Input seguranca={true} icon={Key} placeholder={"Senha"}/>

            <TouchableOpacity
                className='bg-laranja rounded-full py-3 w-[15rem] items-center mt-[15%]'
                onPress={() => navigation.navigate('Login')}
                activeOpacity={0.8}
            >
                <Text className='text-[16px] text-branco font-montserrat'>Cadastrar</Text>
            </TouchableOpacity>

            
            <Text className="font-montserrat-light text-[12px] text-branco mt-[5%]"
            onPress={() => navigation.navigate('Cadastro')}>
                Já tem uma conta? Faça login clicando <Text className='text-laranja underline'>aqui</Text>
            </Text>
          </KeyboardAvoidingView>
        </View>
    )
}

function maskPhone(value) {
  // remove tudo que não for número
  let v = value.replace(/\D/g, "");

  // (11
  if (v.length > 0) {
    v = "(" + v;
  }

  // (11)
  if (v.length > 3) {
    v = v.slice(0, 3) + ") " + v.slice(3);
  }

  // (11) 98765-
  if (v.length > 10) {
    v = v.slice(0, 10) + "-" + v.slice(10, 14);
  }

  return v;
}