import { useState } from 'react';
import { View, Text, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import { Input } from '../components/input';
import { Envelope, Key } from 'phosphor-react-native';
import { useNavigation } from '@react-navigation/native';
import { apiLogin } from '../services/api';

export function Login() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Preencha email e senha.');
      return;
    }

    setLoading(true);
    try {
      await apiLogin({ email, password: senha });
      navigation.navigate('Home');
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

        <Input
          icon={Envelope}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          seguranca={true}
          icon={Key}
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
        />

        <View className="w-[320px] items-start">
          <Text
            className="font-montserrat-light text-[12px] text-branco mt-[-2%] mb-[20%]"
            onPress={() => navigation.navigate('Esqueci')}
          >
            Esqueci minha senha
          </Text>
        </View>

        <TouchableOpacity
          className="bg-laranja rounded-full py-3 w-[15rem] items-center"
          onPress={handleLogin}
          activeOpacity={0.8}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FAFAFA" />
          ) : (
            <Text className="text-[16px] text-branco font-montserrat">Entrar</Text>
          )}
        </TouchableOpacity>

        <Text
          className="font-montserrat-light text-[12px] text-branco mt-[5%]"
          onPress={() => navigation.navigate('Cadastro')}
        >
          Não tem uma conta? Faça cadastro clicando{' '}
          <Text className="text-laranja underline">aqui</Text>
        </Text>
      </KeyboardAvoidingView>
    </View>
  );
}
