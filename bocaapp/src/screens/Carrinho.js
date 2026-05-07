import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Tag, ShieldCheck, ArrowLeft, Handbag } from "phosphor-react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardCart from '../components/cardCart';
import { BASE_IMAGES } from '../components/Custom/passo1';
import { apiGetProducts } from '../services/api';

export function Carrinho({ navigation }) {
    const [cart, setCart] = useState([]);
    const [frete, setFrete] = useState(0);
    const [promoValue, setPromoValue] = useState(0);
    const [promoInput, setPromoInput] = useState('');
    const [snackProducts, setSnackProducts] = useState([]);
    const [snacks, setSnacks] = useState([]);

    function promotionCode() {
        switch (promoInput.toUpperCase()) {
            case 'BOCA10':
                setPromoValue(0.1);
                setPromoInput('');
                break;
            case 'BOCA20':
                setPromoValue(0.2);
                setPromoInput('');
                break;
            case 'FRETEGRATIS':
                setFrete(0);
                setPromoInput('');
                break;
            default:
                setPromoValue(0);
                setPromoInput('');
                break;
        }
    }

    function buildCustomProduct(raw) {
        if (!raw || !raw.base) return null;
        const package_size = raw.package?.package_size || 8;
        const customTax = raw.base ? ((raw.base.price * 0.25) * package_size) : 0;
        const packPrice = raw.base ? Number((raw.base.price * package_size) + customTax + (raw.package?.package_price || 0)) : 0;

        const sabores = raw.flavors?.length ? `Sabores: ${raw.flavors.join(', ')}` : '';
        const cores = raw.color?.length ? `Cores: ${raw.color.map(c => c.name).join(', ')}` : '';
        const detalhes = raw.details?.length ? `Detalhes: ${raw.details.join(', ')}` : '';
        const fullDesc = [raw.description, sabores, cores, detalhes].filter(Boolean).join('\n');

        return {
            id: 'custom',
            name: raw.base?.name || 'Salgado customizado',
            descript: fullDesc || 'Salgado personalizado',
            price: raw.base?.price || 0,
            // Recupera o require() local pelo nome do tamanho (require não sobrevive ao AsyncStorage)
            image: BASE_IMAGES[raw.base?.name] || null,
            image_url: null,
            package_size,
            package_price: packPrice,
            isCustom: true,
            flavors: raw.flavors || [],
            colors: raw.color || [],
            details: raw.details || []
        };
    }

    const subtotal = cart.reduce((total, item) => {
        const product = snackProducts.find(snack => snack.id === item.id);
        const unitPrice = item.size === 'unit' ? product?.price : product?.package_price;
        const price = Number(unitPrice) || 0;
        return total + price * item.quantity;
    }, 0);

    // Busca produtos da API (substitui o mockDatabase)
    useEffect(() => {
        const carregaSalgados = async () => {
            try {
                const data = await apiGetProducts();
                setSnacks(data);
            } catch (error) {
                console.error('Erro ao carregar produtos no carrinho:', error.message);
            }
        };
        carregaSalgados();
    }, []);

    useEffect(() => {
        const loadInitialCart = async () => {
            const saved = await AsyncStorage.getItem("cart");
            const savedCart = saved ? JSON.parse(saved) : [];

            const raw = await AsyncStorage.getItem('customCart');
            const rawCustom = raw ? JSON.parse(raw) : null;

            let merged = [...savedCart];
            if (rawCustom && rawCustom.base) {
                const exists = merged.some(i => i.id === 'custom');
                if (!exists) {
                    merged.push({ id: 'custom', size: 'package', quantity: rawCustom.quantity || 1, isCustom: true });
                }
            }
            setCart(merged);
        };
        loadInitialCart();
    }, []);

    useEffect(() => {
        const loadCustomProduct = async () => {
            const raw = await AsyncStorage.getItem('customCart');
            const parsedRaw = raw ? JSON.parse(raw) : null;
            const customProduct = buildCustomProduct(parsedRaw);
            const products = snacks ? [...snacks] : [];
            if (customProduct) products.push(customProduct);
            setSnackProducts(products);
        };
        loadCustomProduct();
    }, [snacks]);

    async function persistCart(newCart) {
        await AsyncStorage.setItem("cart", JSON.stringify(newCart));
        const customItem = cart.find(item => item.id === 'custom');
        const mergedCart = [...newCart];
        if (customItem && !newCart.some(item => item.id === 'custom')) {
            mergedCart.push(customItem);
        }
        setCart(mergedCart);
    }

    async function handleIncrease(id, size) {
        if (id === 'custom') {
            const raw = await AsyncStorage.getItem('customCart');
            let parsedRaw = raw ? JSON.parse(raw) : null;
            if (!parsedRaw) return;
            parsedRaw.quantity = (parsedRaw.quantity || 1) + 1;
            await AsyncStorage.setItem('customCart', JSON.stringify(parsedRaw));
            setCart(prev => prev.map(item =>
                item.id === 'custom' ? { ...item, quantity: parsedRaw.quantity } : item
            ));
            return;
        }
        const saved = await AsyncStorage.getItem("cart");
        const savedCart = saved ? JSON.parse(saved) : [];
        const idx = savedCart.findIndex(item => item.id === id && item.size === size);
        if (idx === -1) return;
        savedCart[idx].quantity = (savedCart[idx].quantity || 0) + 1;
        persistCart(savedCart);
    }

    async function handleDecrease(id, size) {
        if (id === 'custom') {
            const raw = await AsyncStorage.getItem('customCart');
            let parsedRaw = raw ? JSON.parse(raw) : null;
            if (!parsedRaw) return;
            parsedRaw.quantity = Math.max(1, (parsedRaw.quantity || 1) - 1);
            await AsyncStorage.setItem('customCart', JSON.stringify(parsedRaw));
            setCart(prev => prev.map(item =>
                item.id === 'custom' ? { ...item, quantity: parsedRaw.quantity } : item
            ));
            return;
        }
        const saved = await AsyncStorage.getItem("cart");
        const savedCart = saved ? JSON.parse(saved) : [];
        const idx = savedCart.findIndex(item => item.id === id && item.size === size);
        if (idx === -1) return;
        savedCart[idx].quantity = Math.max(1, (savedCart[idx].quantity || 1) - 1);
        persistCart(savedCart);
    }

    async function handleRemove(id, size) {
        if (id === 'custom') {
            await AsyncStorage.removeItem('customCart');
            setCart(prev => prev.filter(item => item.id !== 'custom'));
            setSnackProducts(prev => prev.filter(p => p.id !== 'custom'));
            return;
        }
        const saved = await AsyncStorage.getItem("cart");
        const savedCart = saved ? JSON.parse(saved) : [];
        const newCart = savedCart.filter(item => !(item.id === id && item.size === size));
        persistCart(newCart);
    }

    return (
        <ScrollView className="flex-1 bg-background w-full" contentContainerStyle={{ paddingBottom: 60 }}>
            <View className="px-6 pt-10">
                <TouchableOpacity onPress={() => navigation.goBack()} className="flex-row items-center mb-6 py-2">
                    <ArrowLeft color="#2e2e2e" size={20} />
                    <Text className="text-cinza ml-2 font-montserrat-medium text-[14px]">Continuar comprando</Text>
                </TouchableOpacity>

                <View className="flex-row items-center mb-8">
                    <View className="bg-laranja/10 p-3 rounded-full mr-4">
                        <Handbag color="#F57C00" size={32} weight="fill" />
                    </View>
                    <View className="flex-col">
                        <Text className="text-cinza font-montserrat-bold text-[22px]">Carrinho de compras</Text>
                        <Text className="text-[#6e6e6e] font-montserrat-light text-[14px]">{cart.length} itens no seu carrinho</Text>
                    </View>
                </View>

                <View className="flex-col gap-5 mb-8">
                    {cart.length > 0 ? (
                        cart.map((cartInfo, index) => (
                            <CardCart
                                key={index}
                                id={cartInfo.id}
                                cartinfo={cartInfo}
                                products={snackProducts}
                                onIncrease={handleIncrease}
                                onDecrease={handleDecrease}
                                onRemove={handleRemove}
                            />
                        ))
                    ) : (
                        <Text className="text-cinza font-montserrat-medium text-center py-10">Seu carrinho está vazio.</Text>
                    )}
                </View>

                <View style={styles.sombra} className="p-6 rounded-[20px] bg-branco w-full">
                    <Text className="text-[20px] font-montserrat-bold mb-4 text-cinza text-left">Resumo do pedido</Text>

                    <View className="flex-row items-center mb-4">
                        <View className="flex-1 flex-row items-center border border-gray-300 rounded-[12px] px-3 mr-3 h-[45px]">
                            <Tag color="#a1a1aa" size={18} />
                            <TextInput
                                className="flex-1 ml-2 text-cinza font-montserrat-regular h-full"
                                placeholder="Código promocional"
                                placeholderTextColor="#a1a1aa"
                                value={promoInput}
                                onChangeText={setPromoInput}
                                autoCapitalize="characters"
                            />
                        </View>
                        <TouchableOpacity onPress={promotionCode} className="h-[45px] px-4 border border-laranja justify-center items-center rounded-[12px]">
                            <Text className="text-laranja font-montserrat-bold text-[14px]">Aplicar</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="w-full h-[1px] bg-gray-200 rounded-full my-4" />

                    <View className="flex-row justify-between mb-2">
                        <Text className="text-[14px] text-cinza font-montserrat-medium">Subtotal</Text>
                        <Text className="text-[14px] text-[#969696] font-montserrat-medium">R${subtotal.toFixed(2)}</Text>
                    </View>

                    {promoValue > 0 && (
                        <View className="flex-row justify-between mb-2">
                            <Text className="text-[14px] text-laranja font-montserrat-medium">Código ativo</Text>
                            <Text className="text-[14px] text-laranja font-montserrat-medium">- R${(subtotal * promoValue).toFixed(2)}</Text>
                        </View>
                    )}

                    <View className="flex-row justify-between mb-2">
                        <Text className="text-[14px] text-cinza font-montserrat-medium">Frete</Text>
                        <Text className={`text-[14px] font-montserrat-medium ${frete === 0 ? 'text-laranja font-bold' : 'text-[#969696]'}`}>
                            {frete === 0 ? 'Grátis' : `R$${frete.toFixed(2)}`}
                        </Text>
                    </View>

                    <View className="w-full h-[1px] bg-gray-200 rounded-full my-4" />

                    <View className="flex-row justify-between items-center mb-6">
                        <Text className="text-[18px] text-cinza font-montserrat-bold">Total</Text>
                        <Text className="text-[20px] text-laranja font-montserrat-extrabold">
                            R${((Number(subtotal) - (Number(subtotal) * promoValue)) + frete).toFixed(2)}
                        </Text>
                    </View>

                    <View className="items-center w-full">
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Pagamento")}
                            className="w-full h-[50px] bg-laranja justify-center items-center rounded-full"
                        >
                            <Text className="text-branco font-montserrat-bold text-[16px]">Continuar pedido</Text>
                        </TouchableOpacity>

                        <View className="flex-row items-center mt-3">
                            <ShieldCheck color="#a1a1aa" size={16} />
                            <Text className="text-[#a1a1aa] font-montserrat-light text-[10px] ml-1">
                                Suas informações de pagamento são criptografadas.
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    sombra: {
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        elevation: 20,
    }
});
