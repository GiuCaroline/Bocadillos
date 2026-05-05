import { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { Input } from '../components/input';
import { Envelope, Key, User, Phone } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { apiRegister } from '../services/api';

export function Cadastro() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCadastro = async () => {
    if (!nome || !email || !senha) {
      Alert.alert('Atenção', 'Preencha nome, email e senha.');
      return;
    }

    setLoading(true);
    try {
      await apiRegister({ name: nome, email, password: senha, phone: telefone });
      Alert.alert('Sucesso!', 'Conta criada com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('Login') },
      ]);
    } catch (error) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-marron">
      <KeyboardAvoidingView
        className="flex-1 justify-center items-center"
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
      >
        <Text className="text-laranja text-4xl font-montserrat-extrabold mb-[12%]">
          BOCA<Text className="text-branco">DILLOS</Text>
        </Text>

        <Input icon={User} placeholder="Nome" value={nome} onChangeText={setNome} />
        <Input
          icon={Phone}
          placeholder="Telefone"
          keyboardType="phone-pad"
          value={telefone}
          onChangeText={(texto) => setTelefone(maskPhone(texto))}
        />
        <Input
          icon={Envelope}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Input seguranca={true} icon={Key} placeholder="Senha" value={senha} onChangeText={setSenha} />

        <TouchableOpacity
          className="bg-laranja rounded-full py-3 w-[15rem] items-center mt-[15%]"
          onPress={handleCadastro}
          activeOpacity={0.8}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FAFAFA" />
          ) : (
            <Text className="text-[16px] text-branco font-montserrat">Cadastrar</Text>
          )}
        </TouchableOpacity>

        <Text
          className="font-montserrat-light text-[12px] text-branco mt-[5%]"
          onPress={() => navigation.navigate('Login')}
        >
          Já tem uma conta? Faça login clicando{' '}
          <Text className="text-laranja underline">aqui</Text>
        </Text>
      </KeyboardAvoidingView>
    </View>
  );
}

function maskPhone(value) {
  let v = value.replace(/\D/g, '');
  if (v.length > 0) v = '(' + v;
  if (v.length > 3) v = v.slice(0, 3) + ') ' + v.slice(3);
  if (v.length > 10) v = v.slice(0, 10) + '-' + v.slice(10, 14);
  return v;
}
