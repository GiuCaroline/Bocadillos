import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Animated, PanResponder, StyleSheet, Dimensions } from 'react-native';
import { Plus, Minus, FileImage, X } from "phosphor-react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const BOTTOM_SHEET_MAX_HEIGHT = SCREEN_HEIGHT * 0.3;
const BOTTOM_SHEET_MIN_HEIGHT = 35;
const MAX_UPWARD_TRANSLATE_Y = 0;
const MAX_DOWNWARD_TRANSLATE_Y = BOTTOM_SHEET_MAX_HEIGHT - BOTTOM_SHEET_MIN_HEIGHT;

// Exportado para o Carrinho.jsx usar e recuperar o require() pelo nome
export const BASE_IMAGES = {
    'Pequeno': require('../../../assets/pequeno.png'),
    'Médio':   require('../../../assets/medio.png'),
    'Grande':  require('../../../assets/grande.png'),
};

export function Passo1({ moveStep, customCart, setCustomCart, quantity, setQuantity }) {

    let customTax = customCart.base ? ((customCart.base.price * 0.25) * customCart.package.package_size) : 0;
    let packPrice = customCart.base ? 
        Number((customCart.base.price * customCart.package.package_size) + customTax + customCart.package.package_price) : 0;

    function selectBase(baseName, basePrice) {
        // Salva apenas nome e preço — require() não sobrevive ao JSON.stringify do AsyncStorage
        const updatedCustomCart = {
            ...customCart,
            base: { name: baseName, price: basePrice }
        };
        setCustomCart(updatedCustomCart);
    }

    function increaseQuantity() {
        const updatedCustomCart = { ...customCart, quantity: quantity + 1 };
        setQuantity(quantity + 1);
        setCustomCart(updatedCustomCart);
    }

    function decreaseQuantity() {
        if (quantity > 1) {
            const updatedCustomCart = { ...customCart, quantity: quantity - 1 };
            setQuantity(quantity - 1);
            setCustomCart(updatedCustomCart);
        }
    }

    const animatedValue = useRef(new Animated.Value(MAX_DOWNWARD_TRANSLATE_Y)).current;
    const lastGestureDy = useRef(MAX_DOWNWARD_TRANSLATE_Y);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponder: (_, gestureState) => Math.abs(gestureState.dy) > 10,
            onPanResponderGrant: () => {
                animatedValue.setOffset(lastGestureDy.current);
                animatedValue.setValue(0);
            },
            onPanResponderMove: (e, gesture) => animatedValue.setValue(gesture.dy),
            onPanResponderRelease: (e, gesture) => {
                animatedValue.flattenOffset();
                const currentY = lastGestureDy.current + gesture.dy;
                if (gesture.vy < -0.5 || currentY < MAX_DOWNWARD_TRANSLATE_Y / 2) openSheet();
                else closeSheet();
            }
        })
    ).current;

    const openSheet = () => {
        Animated.spring(animatedValue, { toValue: MAX_UPWARD_TRANSLATE_Y, useNativeDriver: true, friction: 8, tension: 50 }).start();
        lastGestureDy.current = MAX_UPWARD_TRANSLATE_Y;
    };

    const closeSheet = () => {
        Animated.spring(animatedValue, { toValue: MAX_DOWNWARD_TRANSLATE_Y, useNativeDriver: true, friction: 8, tension: 50 }).start();
        lastGestureDy.current = MAX_DOWNWARD_TRANSLATE_Y;
    };

    // Resolve a imagem pelo nome — funciona em memória sem precisar serializar
    const baseImage = customCart.base?.name ? BASE_IMAGES[customCart.base.name] : null;

    return (
        <View className="flex-1 w-full">
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingTop: 24 }} className='flex-1 w-full'>
            <View className='flex-col w-full'>
                <View className='w-full'>
                    <View className="w-full items-center">
                        <Text className="text-[25px] font-montserrat-bold mb-[10%] text-cinza">Tamanho do <Text className='text-laranja'>salgado</Text></Text>

                        <View className="flex-col w-full">
                            <TouchableOpacity style={styles.shadow} onPress={() => selectBase("Pequeno", 1)} className={`w-full mb-4 p-3 flex justify-center rounded-[30px] ${customCart.base?.name === "Pequeno" ? 'bg-marron' : 'bg-branco'}`}>
                                <View className='flex-row'>
                                    <Image source={BASE_IMAGES['Pequeno']} className='w-24 h-24 rounded-[20px]' resizeMode="cover" />
                                    <View className='flex-col ml-[5%]'>
                                        <Text className={`font-montserrat-bold text-[18px] ${customCart.base?.name === "Pequeno" ? 'text-branco' : 'text-cinza'}`}>Pequeno</Text>
                                        <Text className={`font-montserrat-light text-[12px] mt-2 ${customCart.base?.name === "Pequeno" ? 'text-branco' : 'text-[#6e6e6e]'}`}>Altura aprox.: 3,5 cm</Text>
                                        <Text className={`font-montserrat-light text-[12px] mt-2 ${customCart.base?.name === "Pequeno" ? 'text-branco' : 'text-cinza'}`}>R$1,00 cada</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.shadow} onPress={() => selectBase("Médio", 2)} className={`${customCart.base?.name === "Médio" ? 'bg-marron' : 'bg-branco'} w-full mb-4 p-3 flex justify-center rounded-[30px]`}>
                                <View className='flex-row'>
                                    <Image source={BASE_IMAGES['Médio']} className='w-24 h-24 rounded-[20px]' resizeMode="cover" />
                                    <View className='flex-col ml-[5%]'>
                                        <Text className={`font-montserrat-bold text-[18px] ${customCart.base?.name === "Médio" ? 'text-branco' : 'text-cinza'}`}>Médio</Text>
                                        <Text className={`font-montserrat-light text-[12px] mt-2 ${customCart.base?.name === "Médio" ? 'text-branco' : 'text-[#6e6e6e]'}`}>Altura aprox.: 7 cm</Text>
                                        <Text className={`font-montserrat-light text-[12px] mt-2 ${customCart.base?.name === "Médio" ? 'text-branco' : 'text-cinza'}`}>R$2,00 cada</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.shadow} onPress={() => selectBase("Grande", 5)} className={`${customCart.base?.name === "Grande" ? 'bg-marron' : 'bg-branco'} w-full mb-4 p-3 flex justify-center rounded-[30px]`}>
                                <View className='flex-row'>
                                    <Image source={BASE_IMAGES['Grande']} className='w-24 h-24 rounded-[20px]' resizeMode="cover" />
                                    <View className='flex-col ml-[5%]'>
                                        <Text className={`font-montserrat-bold text-[18px] ${customCart.base?.name === "Grande" ? 'text-branco' : 'text-cinza'}`}>Grande</Text>
                                        <Text className={`font-montserrat-light text-[12px] mt-2 ${customCart.base?.name === "Grande" ? 'text-branco' : 'text-[#6e6e6e]'}`}>Altura aprox.: 12 cm</Text>
                                        <Text className={`font-montserrat-light text-[12px] mt-2 ${customCart.base?.name === "Grande" ? 'text-branco' : 'text-cinza'}`}>R$5,00 cada</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="flex-row justify-between gap-20 w-full mb-[15%] mt-[20%]">
                        <TouchableOpacity disabled className='flex-1 h-12 justify-center items-center opacity-50 bg-gray-200 rounded-full'>
                            <Text className='text-cinza font-montserrat-bold'>Voltar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { moveStep(1) }} className='flex-1 h-12 justify-center items-center bg-laranja rounded-full'>
                            <Text className='text-branco font-montserrat-bold'>Avançar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ScrollView>

        <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: animatedValue }] }]}>
            <View {...panResponder.panHandlers}>
                <TouchableOpacity 
                    activeOpacity={1} 
                    onPress={() => {
                        if (lastGestureDy.current === MAX_DOWNWARD_TRANSLATE_Y) openSheet();
                        else closeSheet();
                    }} 
                    className="w-full bg-laranja items-center justify-center h-[85px] rounded-t-[30px]"
                >
                    <View className="w-20 h-1.5 bg-[#f0f0f0] opacity-80 rounded-full" />
                    <Text className='mt-[8%] font-montserrat-bold text-[18px]'>Sua criação</Text>
                </TouchableOpacity>
            </View>
                    
            <View className="bg-background w-full flex-1 px-4">
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                    <View className='flex-row items-center'>
                        {baseImage ? (
                            <Image
                                source={baseImage}
                                className="mt-[5%] w-40 h-40 rounded-[20px]"
                                resizeMode="cover"
                            />
                        ) : (
                            <View className="flex items-center justify-center w-40 h-40 bg-gray-200 rounded-[20px] mt-[5%]">
                                <FileImage size={40} color="#a1a1aa" />
                            </View>
                        )}

                        <View className='ml-[2%] mt-[5%]'>
                            <Text className='text-cinza font-montserrat-bold text-[14px]'>Tamanho</Text>
                            {customCart.base?.name ? (
                                <Text className="text-cinza font-montserrat-light text-base text-left mt-[-4%]">{customCart.base.name}</Text>
                            ) : (
                                <View className="h-3 bg-gray-300 rounded-md w-48 mt-[-2%]" />
                            )}

                            <View className={`${customCart.package ? 'flex' : 'hidden'}`}>
                                <Text className='text-cinza font-montserrat-bold text-[14px] mt-[2%]'>Tamanho do pacote</Text>
                                {customCart.package?.package_size ? (
                                    <Text className="text-cinza font-montserrat-light text-base text-left mt-[-4%]">{customCart.package.package_name} ({customCart.package.package_size} uni.)</Text>
                                ) : (
                                    <View className="h-3 bg-gray-300 rounded-md w-48 mt-[-5%]" />
                                )}
                            </View>

                            <View className={`${customCart.flavors && customCart.flavors.length > 0 ? 'flex' : 'hidden'}`}>
                                <Text className='text-cinza font-montserrat-bold text-lg mt-[2%]'>Sabores</Text>
                                <Text className="text-sm text-cinza font-montserrat-light text-left mt-[-4%]">
                                    {customCart.flavors && customCart.flavors.length > 0 ? (
                                        <Text>
                                            <Text className="underline">{customCart.flavors[0]}</Text>
                                            {customCart.flavors.length > 1 ? `, ${customCart.flavors.slice(1).join(", ")}` : ''}
                                        </Text>
                                    ) : ''}
                                </Text>
                            </View>

                            <View className={`${customCart.description ? 'flex' : 'hidden'}`}>
                                <Text className='text-cinza font-montserrat-bold text-lg mt-[2%]'>Modo de preparo</Text>
                                <Text className="text-base text-cinza font-montserrat text-left">
                                    {customCart.description ? customCart.description : ''}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View className={`${customCart.color ? 'flex' : 'hidden'} mt-6 mb-4 h-[1px] w-full bg-marron rounded-full`}></View>

                    <View className={`${customCart.color ? 'flex-row' : 'hidden'} justify-between items-center`}>
                        <Text className="text-sm text-cinza text-left font-montserrat-bold">Preço base</Text>
                        {customCart.base?.price ? (
                            <Text className="text-sm text-gray-500 text-right font-montserrat-medium">R${customCart.base.price.toFixed(2)}</Text>
                        ) : (
                            <View className="h-3 bg-gray-300 rounded-md w-16" />
                        )}
                    </View>

                    <View className={`${customCart.color ? 'flex-row' : 'hidden'} justify-between items-center mt-2`}>
                        <Text className="text-sm text-cinza text-left font-montserrat-bold">Taxa de customização</Text>
                        {customCart.base ? (
                            <Text className="text-sm text-gray-500 text-right font-montserrat-medium">R${customTax.toFixed(2)}</Text>
                        ) : (
                            <View className="h-3 bg-gray-300 rounded-md w-16" />
                        )}
                    </View>

                    <View className={`${customCart.color ? 'flex-row' : 'hidden'} justify-between items-center mt-2`}>
                        <Text className="text-sm text-cinza text-left font-montserrat-bold">Upgrade de pacote</Text>
                        <Text className="text-sm text-gray-500 text-right font-montserrat-medium">
                            {customCart.package ? `R$${customCart.package.package_price.toFixed(2)}` : ''}
                        </Text>
                    </View>

                    <View className={`${customCart.color ? 'flex' : 'hidden'} mt-4 mb-4 h-[1px] w-full bg-marron rounded-full`}></View>

                    <View className={`${customCart.color ? 'flex-row' : 'hidden'} justify-between items-center mt-1`}>
                        <Text className="text-base text-cinza text-left font-montserrat-bold">Total por pacote</Text>
                        {customCart.package ? (
                            <Text className="text-base text-laranja text-right font-montserrat-bold">
                                {customCart.base ? `R$${packPrice.toFixed(2)}` : ''}
                            </Text>
                        ) : (
                            <View className="h-3 bg-laranja opacity-50 rounded-md w-16" />
                        )}
                    </View>

                    <View className={`${customCart.color ? 'flex-row' : 'hidden'} justify-between items-center mt-2`}>
                        <Text className="text-sm text-cinza text-left font-montserrat-bold">Quantidade de pacotes</Text>
                        <View className="flex-row items-center gap-3">
                            <TouchableOpacity onPress={decreaseQuantity} className="flex items-center justify-center w-8 h-8 rounded-md bg-transparent border-gray-300 border">
                                <Minus color="#2e2e2e" size={16} />
                            </TouchableOpacity>
                            <Text className="text-cinza font-montserrat-semibold">{quantity}</Text>
                            <TouchableOpacity onPress={increaseQuantity} className="flex items-center justify-center w-8 h-8 rounded-md bg-transparent border-gray-300 border">
                                <Plus color="#2e2e2e" size={16} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className={`${customCart.color ? 'flex-row' : 'hidden'} justify-between items-center mt-7`}>
                        <Text className='text-cinza font-montserrat-bold text-xl'>Total da compra</Text>
                        {customCart.base ? (
                            <Text className="text-xl text-laranja text-right font-montserrat-extrabold">
                                R${(packPrice * quantity).toFixed(2)}
                            </Text>
                        ) : (
                            <View className="h-4 bg-laranja opacity-50 rounded-md w-24" />
                        )}
                    </View>

                    <TouchableOpacity className={`${customCart.color ? 'flex' : 'hidden'} w-full h-12 bg-laranja rounded-full justify-center items-center mt-7 mb-4`}>
                        <Text className='text-branco font-montserrat-bold'>Adicionar ao carrinho</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  bottomSheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0, 
    height: BOTTOM_SHEET_MAX_HEIGHT,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  }
});
