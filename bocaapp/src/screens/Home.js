import { useState, useEffect, useCallback } from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native';
import { NavTop } from '../components/navTop';
import { Nav } from '../components/nav';
import { useNavigation } from '@react-navigation/native';
import { CaretRight, Sparkle, Plus, Minus } from 'phosphor-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiGetProducts } from '../services/api';

export function Home() {
  const navigation = useNavigation();
  const [tipoSelecionado, setTipoSelecionado] = useState({});
  const [quantidades, setQuantidades] = useState({});
  const [destaques, setDestaques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const getTipo = (id) => tipoSelecionado[id] || 'unidade';
  const getQtd = (id) => quantidades[id] || 0;

  const alterarQtd = (id, delta) => {
    setQuantidades((prev) => {
      const novo = (prev[id] || 0) + delta;
      return { ...prev, [id]: novo < 0 ? 0 : novo };
    });
  };

  const toggleTipo = (id, tipo) => {
    setTipoSelecionado((prev) => ({ ...prev, [id]: tipo }));
  };

  const carregarProdutos = useCallback(async () => {
    setLoading(true);
    setErro(null);
    try {
      const produtos = await apiGetProducts();
      setDestaques(produtos.slice(0, 2));
    } catch (error) {
      setErro(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarProdutos();
  }, [carregarProdutos]);

  const adicionarAoCarrinho = async (item) => {
    const tipo = getTipo(item.id) === 'unidade' ? 'unit' : 'package';
    const qtd = getQtd(item.id) > 0 ? getQtd(item.id) : 1;

    try {
      const existingCart = await AsyncStorage.getItem('cart');
      let cart = existingCart ? JSON.parse(existingCart) : [];

      const itemIndex = cart.findIndex((c) => c.id === item.id && c.size === tipo);
      if (itemIndex > -1) {
        cart[itemIndex].quantity += qtd;
      } else {
        cart.push({ id: item.id, size: tipo, quantity: qtd });
      }

      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      Alert.alert(
        'Sucesso!',
        `${qtd}x ${item.name} (${tipo === 'unit' ? 'Unidade' : 'Pacote'}) adicionado(s) ao carrinho!`
      );
      setQuantidades((prev) => ({ ...prev, [item.id]: 0 }));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar ao carrinho.');
    }
  };

  const getPreco = (item) => {
    if (getTipo(item.id) === 'pacote' && item.package_price) {
      return Number(item.package_price).toFixed(2).replace('.', ',');
    }
    return Number(item.price).toFixed(2).replace('.', ',');
  };

  return (
    <View className="flex-1 bg-background">
      <NavTop />
      <ScrollView contentContainerStyle={{ padding: 10, paddingBottom: 95 }} className="flex px-2">
        <View style={styles.sombra} className="bg-branco rounded-[30px] justify-center items-center p-4 mt-[4%]">
          <Text className="font-montserrat-extrabold text-laranja text-[22px]">
            SALGADOS <Text className="text-cinza">ARTESANAIS</Text>
          </Text>
          <Text className="font-montserrat text-cinza text-center text-[17px] mt-[2%]">{`Feitos com carinho,\nfresquinhos todos os dias`}</Text>
          <TouchableOpacity
            className="bg-laranja rounded-[20px] p-2 w-[60%] items-center mt-[4%]"
            onPress={() => navigation.navigate('Loja')}
            activeOpacity={0.8}
          >
            <Text className="text-background font-montserrat">Ver cardápio completo</Text>
          </TouchableOpacity>
        </View>

        <View className="mt-[5%]">
          <View className="flex-row justify-between items-center">
            <Text className="font-montserrat-bold text-[20px]">Destaques</Text>
            <TouchableOpacity
              className="flex-row items-center"
              onPress={() => navigation.navigate('Loja')}
              activeOpacity={0.8}
            >
              <Text className="font-montserrat text-[14px]">Ver cardápio</Text>
              <CaretRight size={20} weight="light" />
            </TouchableOpacity>
          </View>

          {/* Estados: loading, erro, ou lista de produtos */}
          {loading ? (
            <ActivityIndicator size="large" color="#F57C00" style={{ marginTop: 20 }} />
          ) : erro ? (
            <View className="items-center mt-4">
              <Text className="font-montserrat text-cinza text-center">{erro}</Text>
              <TouchableOpacity onPress={carregarProdutos} className="mt-2">
                <Text className="text-laranja font-montserrat-bold">Tentar novamente</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="flex-row flex-wrap justify-between mt-[3%]">
              {destaques.map((item) => (
                <View
                  key={item.id}
                  style={styles.sombra}
                  className="bg-branco rounded-[15px] p-2 py-3 items-center w-[48%] h-auto mb-4"
                >
                  {item.image_url ? (
                    <Image
                      source={{ uri: item.image_url }}
                      className="rounded-[15px] w-full h-[30%]"
                      resizeMode="cover"
                    />
                  ) : null}
                  <Text className="font-montserrat-bold text-[17px] mt-2 text-start w-full text-cinza">
                    {item.name}
                  </Text>
                  <Text className="font-montserrat-light text-[10px] text-cinza">{item.description}</Text>

                  <View className="w-full flex-row justify-between mt-[3%]">
                    <TouchableOpacity
                      className={`${getTipo(item.id) === 'unidade' ? 'bg-laranja' : 'bg-transparent border border-laranja'} rounded-[5px] flex-row items-center justify-center gap-1 p-1 w-[48%]`}
                      activeOpacity={0.8}
                      onPress={() => toggleTipo(item.id, 'unidade')}
                    >
                      <Sparkle size={15} weight="fill" color={getTipo(item.id) === 'unidade' ? '#FAFAFA' : '#F57C00'} />
                      <Text className={`${getTipo(item.id) === 'unidade' ? 'text-branco' : 'text-laranja'} font-montserrat-semibold text-[10px]`}>
                        Unidade
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      className={`${getTipo(item.id) === 'pacote' ? 'bg-laranja' : 'bg-transparent border border-laranja'} rounded-[5px] flex-row items-center justify-center gap-1 p-1 w-[48%]`}
                      activeOpacity={0.8}
                      onPress={() => toggleTipo(item.id, 'pacote')}
                    >
                      <Sparkle size={15} weight="fill" color={getTipo(item.id) === 'pacote' ? '#FAFAFA' : '#F57C00'} />
                      <Text className={`${getTipo(item.id) === 'pacote' ? 'text-branco' : 'text-laranja'} font-montserrat-semibold text-[10px]`}>
                        Pacote
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <Text className="font-montserrat-bold text-cinza text-[18px] mt-[4%] text-left w-full">
                    R${getPreco(item)}
                    <Text className="font-montserrat text-[10px]">
                      {getTipo(item.id) === 'unidade' ? ' por unidade' : ' por pacote'}
                    </Text>
                  </Text>

                  <View className="flex-row w-full items-center gap-2 mt-[5%]">
                    <TouchableOpacity
                      className="border rounded-[5px] border-cinza p-1"
                      activeOpacity={0.8}
                      onPress={() => alterarQtd(item.id, -1)}
                    >
                      <Minus size={15} color="#2e2e2e" />
                    </TouchableOpacity>
                    <Text className="font-montserrat-medium text-cinza">{getQtd(item.id)}</Text>
                    <TouchableOpacity
                      className="border rounded-[5px] border-cinza p-1"
                      activeOpacity={0.8}
                      onPress={() => alterarQtd(item.id, 1)}
                    >
                      <Plus size={15} color="#2e2e2e" />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    onPress={() => adicionarAoCarrinho(item)}
                    className="bg-laranja rounded-[20px] p-1 w-full mt-[5%] items-center justify-center"
                  >
                    <Text className="font-montserrat text-branco text-[12px]">Adicionar ao carrinho</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
      <Nav active="Home" onChange={(r) => navigation.navigate(r)} />
    </View>
  );
}

const styles = StyleSheet.create({
  sombra: {
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 20,
  },
});
