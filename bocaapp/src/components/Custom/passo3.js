import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Animated, PanResponder, StyleSheet, Dimensions } from 'react-native';
import { Plus, Minus, FileImage } from "phosphor-react-native";
import { BASE_IMAGES } from './passo1';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const BOTTOM_SHEET_MAX_HEIGHT = SCREEN_HEIGHT * 0.75;
const BOTTOM_SHEET_MIN_HEIGHT = 35;
const MAX_UPWARD_TRANSLATE_Y = 0;
const MAX_DOWNWARD_TRANSLATE_Y = BOTTOM_SHEET_MAX_HEIGHT - BOTTOM_SHEET_MIN_HEIGHT;

export function Passo3({ moveStep, customCart, setCustomCart, quantity, setQuantity }) {
    const detailsList = ["Frito", "Assado", "Congelado"];

    let customTax = customCart.base ? ((customCart.base.price * 0.25) * customCart.package.package_size) : 0;
    let packPrice = customCart.base ?
        Number((customCart.base.price * customCart.package.package_size) + customTax + customCart.package.package_price) : 0;

    function selectDetail(detailName) {
        let selectedDetails = customCart.details ? [...customCart.details] : [];
        selectedDetails = selectedDetails.includes(detailName) ? [] : [detailName];
        setCustomCart({ ...customCart, details: selectedDetails });
    }

    function increaseQuantity() {
        setQuantity(quantity + 1);
        setCustomCart({ ...customCart, quantity: quantity + 1 });
    }

    function decreaseQuantity() {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            setCustomCart({ ...customCart, quantity: quantity - 1 });
        }
    }

    const animatedValue = useRef(new Animated.Value(MAX_DOWNWARD_TRANSLATE_Y)).current;
    const lastGestureDy = useRef(MAX_DOWNWARD_TRANSLATE_Y);

    const panResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => false,
        onMoveShouldSetPanResponder: (_, gs) => Math.abs(gs.dy) > 10,
        onPanResponderGrant: () => { animatedValue.setOffset(lastGestureDy.current); animatedValue.setValue(0); },
        onPanResponderMove: (e, gesture) => animatedValue.setValue(gesture.dy),
        onPanResponderRelease: (e, gesture) => {
            animatedValue.flattenOffset();
            const currentY = lastGestureDy.current + gesture.dy;
            if (gesture.vy < -0.5 || currentY < MAX_DOWNWARD_TRANSLATE_Y / 2) openSheet();
            else closeSheet();
        }
    })).current;

    const openSheet = () => {
        Animated.spring(animatedValue, { toValue: MAX_UPWARD_TRANSLATE_Y, useNativeDriver: true, friction: 8, tension: 50 }).start();
        lastGestureDy.current = MAX_UPWARD_TRANSLATE_Y;
    };
    const closeSheet = () => {
        Animated.spring(animatedValue, { toValue: MAX_DOWNWARD_TRANSLATE_Y, useNativeDriver: true, friction: 8, tension: 50 }).start();
        lastGestureDy.current = MAX_DOWNWARD_TRANSLATE_Y;
    };

    const baseImage = customCart.base?.name ? BASE_IMAGES[customCart.base.name] : null;

    return (
        <View className="flex-1 w-full">
            <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24 }} className='flex-1 w-full'>
                <View className='flex-col w-full'>
                    <View className='w-full'>
                        <View className="w-full mt-[20%]">
                            <Text className="text-[25px] font-montserrat-bold text-cinza text-center">Modo de <Text className='text-laranja'>preparo</Text></Text>
                            <Text className="text-[12px] font-montserrat-light mb-[10%] text-cinza text-center">Selecione o modo de preparo em que você gostaria de receber seus salgados.</Text>

                            <View className='flex-row flex-wrap justify-center gap-4 w-full'>
                                {detailsList.map((detail) => {
                                    const isSelected = customCart.details?.includes(detail);
                                    return (
                                        <TouchableOpacity key={detail} onPress={() => selectDetail(detail)} style={styles.shadow}
                                            className={`w-[48%] h-20 mb-4 justify-center items-center rounded-[30px] ${isSelected ? 'bg-marron' : 'bg-branco'}`}>
                                            <Text numberOfLines={2} className={`font-montserrat-regular text-center text-[14px] ${isSelected ? 'text-branco' : 'text-cinza'}`}>{detail}</Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        </View>

                        <View className="flex-row justify-between gap-20 w-full mb-[25%] mt-[40%]">
                            <TouchableOpacity onPress={() => moveStep(1)} className='flex-1 h-12 justify-center items-center bg-marron rounded-full'>
                                <Text className='text-branco font-montserrat-bold'>Voltar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => moveStep(3)} className='flex-1 h-12 justify-center items-center bg-laranja rounded-full'>
                                <Text className='text-branco font-montserrat-bold'>Avançar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: animatedValue }] }]}>
                <View {...panResponder.panHandlers}>
                    <TouchableOpacity activeOpacity={1}
                        onPress={() => { if (lastGestureDy.current === MAX_DOWNWARD_TRANSLATE_Y) openSheet(); else closeSheet(); }}
                        className="w-full bg-laranja items-center justify-center h-[85px] rounded-t-[30px]">
                        <View className="w-20 h-1.5 bg-[#f0f0f0] opacity-80 rounded-full" />
                        <Text className='mt-[8%] font-montserrat-bold text-[18px] text-cinza'>Sua criação</Text>
                    </TouchableOpacity>
                </View>

                <View className="bg-background w-full flex-1 px-4">
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                        <View className='flex-row items-center'>
                            {baseImage ? (
                                <Image source={baseImage} className="mt-[5%] w-40 h-40 rounded-[20px]" resizeMode="cover" />
                            ) : (
                                <View className="flex items-center justify-center w-40 h-40 bg-gray-200 rounded-[20px] mt-[5%]">
                                    <FileImage size={40} color="#a1a1aa" />
                                </View>
                            )}

                            <View className='ml-[5%] mt-[5%] flex-1'>
                                <Text className='text-cinza font-montserrat-bold text-[14px]'>Tamanho</Text>
                                {customCart.base?.name ? (
                                    <Text className="text-cinza font-montserrat-light text-base text-left mt-[-4%]">{customCart.base.name}</Text>
                                ) : <View className="h-3 bg-gray-300 rounded-md w-full mt-[-2%]" />}

                                <View className={`${customCart.package ? 'flex' : 'hidden'}`}>
                                    <Text className='text-cinza font-montserrat-bold text-[14px] mt-[2%]'>Tamanho do pacote</Text>
                                    {customCart.package?.package_size ? (
                                        <Text className="text-cinza font-montserrat-light text-base text-left mt-[-4%]">{customCart.package.package_name} ({customCart.package.package_size} uni.)</Text>
                                    ) : <View className="h-3 bg-gray-300 rounded-md w-full mt-[-5%]" />}
                                </View>

                                <View className={`${customCart.flavors && customCart.flavors.length > 0 ? 'flex' : 'hidden'}`}>
                                    <Text className='text-cinza font-montserrat-bold text-[14px] mt-[2%]'>Sabores</Text>
                                    <Text className="text-sm text-cinza font-montserrat-light text-left mt-[-4%]">
                                        {customCart.flavors ? customCart.flavors.join(", ") : ''}
                                    </Text>
                                </View>

                                <View className={`${customCart.details && customCart.details.length > 0 ? 'flex' : 'hidden'}`}>
                                    <Text className='text-cinza font-montserrat-bold text-[14px] mt-[2%]'>Modo de preparo</Text>
                                    <Text className="text-sm text-cinza font-montserrat-light text-left mt-[-4%]">
                                        {customCart.details ? customCart.details.join(", ") : ''}
                                    </Text>
                                </View>
                            </View>
                        </View>

                        <View className={`${customCart.description ? 'flex' : 'hidden'} mt-5`}>
                            <Text className='text-cinza font-montserrat-bold text-lg'>Descrição</Text>
                            <Text className="text-base text-cinza font-montserrat-light text-left mt-1">{customCart.description}</Text>
                        </View>

                        <View className="mt-6 mb-4 h-[1px] w-full bg-marron rounded-full"></View>
                        <View className="flex-row justify-between items-center">
                            <Text className="text-sm text-cinza text-left font-montserrat-bold">Preço base</Text>
                            {customCart.base?.price ? <Text className="text-sm text-gray-500 text-right font-montserrat-medium">R${customCart.base.price.toFixed(2)}</Text> : <View className="h-3 bg-gray-300 rounded-md w-16" />}
                        </View>
                        <View className="flex-row justify-between items-center mt-2">
                            <Text className="text-sm text-cinza text-left font-montserrat-bold">Taxa de customização</Text>
                            {customCart.base ? <Text className="text-sm text-gray-500 text-right font-montserrat-medium">R${customTax.toFixed(2)}</Text> : <View className="h-3 bg-gray-300 rounded-md w-16" />}
                        </View>
                        <View className={`${customCart.package ? 'flex-row' : 'hidden'} justify-between items-center mt-2`}>
                            <Text className="text-sm text-cinza text-left font-montserrat-bold">Upgrade de pacote</Text>
                            <Text className="text-sm text-gray-500 text-right font-montserrat-medium">{customCart.package ? `R$${customCart.package.package_price.toFixed(2)}` : ''}</Text>
                        </View>
                        <View className="mt-4 mb-4 h-[1px] w-full bg-marron rounded-full"></View>
                        <View className="flex-row justify-between items-center mt-1">
                            <Text className="text-base text-cinza text-left font-montserrat-bold">Total por pacote</Text>
                            {customCart.package ? <Text className="text-base text-laranja text-right font-montserrat-bold">{customCart.base ? `R$${packPrice.toFixed(2)}` : ''}</Text> : <View className="h-3 bg-laranja opacity-50 rounded-md w-16" />}
                        </View>
                        <View className="flex-row justify-between items-center mt-4">
                            <Text className="text-sm text-cinza text-left font-montserrat-bold">Quantidade de pacotes</Text>
                            <View className="flex-row items-center gap-3">
                                <TouchableOpacity onPress={decreaseQuantity} className="flex items-center justify-center w-8 h-8 rounded-md bg-transparent border-cinza border">
                                    <Minus color="#2e2e2e" size={16} />
                                </TouchableOpacity>
                                <Text className="text-cinza font-montserrat-semibold">{quantity}</Text>
                                <TouchableOpacity onPress={increaseQuantity} className="flex items-center justify-center w-8 h-8 rounded-md bg-transparent border-cinza border">
                                    <Plus color="#2e2e2e" size={16} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View className="flex-row justify-between items-center mt-7">
                            <Text className='text-cinza font-montserrat-bold text-xl'>Total da compra</Text>
                            {customCart.base ? <Text className="text-xl text-laranja text-right font-montserrat-extrabold">R${(packPrice * quantity).toFixed(2)}</Text> : <View className="h-4 bg-laranja opacity-50 rounded-md w-24" />}
                        </View>
                        <TouchableOpacity className="w-full h-12 bg-laranja rounded-full justify-center items-center mt-7 mb-4">
                            <Text className='text-branco font-montserrat-bold'>Adicionar ao carrinho</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </Animated.View>
        </View>
    )
}

const styles = StyleSheet.create({
    shadow: { shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 6, elevation: 6 },
    bottomSheet: { position: 'absolute', left: 0, right: 0, bottom: 0, height: BOTTOM_SHEET_MAX_HEIGHT, shadowColor: "#000", shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.15, shadowRadius: 10, elevation: 10 }
});
