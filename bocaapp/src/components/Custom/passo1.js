import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Modal, StyleSheet } from 'react-native';
import { Plus, Minus, FileImage, X } from "phosphor-react-native";

export function Passo1({ moveStep }) {
    const [quantity, setQuantity] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [customCart, setCustomCart] = useState({
        quantity: quantity,
        package: { package_size: 8, package_price: 0 },
        description: ''
    });

    let customTax = customCart.base ? ((customCart.base.price * 0.25) * customCart.package.package_size) : 0;
    let packPrice = customCart.base ? 
        Number((customCart.base.price * customCart.package.package_size) + customTax + customCart.package.package_price) : 0;

    function selectBase(baseName, basePrice, image) {
        const updatedCustomCart = {
            ...customCart,
            base: {
                name: baseName,
                price: basePrice,
                image: image
            }
        };
        setCustomCart(updatedCustomCart);
    }

    function increaseQuantity() {
        const updatedCustomCart = {
            ...customCart,
            quantity: quantity + 1
        };
        setQuantity(quantity + 1);
        setCustomCart(updatedCustomCart);
    }

    function decreaseQuantity() {
        if (quantity > 1) {
            const updatedCustomCart = {
                ...customCart,
                quantity: quantity - 1
            };
            setQuantity(quantity - 1);
            setCustomCart(updatedCustomCart);
        }
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }} className='flex-1 w-full'>
            <View className='flex-col w-full'>
                <View className='w-full'>
                    <View className="w-full items-center">
                        <Text className="text-[25px] font-montserrat-bold mb-[10%] text-cinza">Tamanho do <Text className='text-laranja'>salgado</Text></Text>

                        <View className="flex-col w-full">
                            {/* OPÇÃO 1 */}
                                <TouchableOpacity style={styles.shadow} onPress={() => { selectBase("Pequeno", 10, require('../../../assets/pequeno.png')) }} className={`w-full mb-4 p-3 flex justify-center rounded-[30px] ${customCart.base?.name === "Pequeno" ? 'bg-marron' : 'bg-branco'}`}>
                                <View className='flex-row'>
                                    <Image
                                        source={require('../../../assets/pequeno.png')}
                                        className='w-24 h-24 rounded-[20px]'
                                        resizeMode="cover"
                                    />
                                    <View className='flex-col ml-[5%]'>
                                        <Text className={`font-montserrat-bold text-[18px] ${customCart.base?.name === "Pequeno" ? 'text-branco' : 'text-cinza'}`}>Pequeno</Text>
                                        <Text className={`font-montserrat-light text-[12px] mt-2 ${customCart.base?.name === "Pequeno" ? 'text-branco' : 'text-[#6e6e6e]'}`}>Altura aprox.: 3,5 cm</Text>
                                        <Text className={`font-montserrat-light text-[12px] mt-2 ${customCart.base?.name === "Pequeno" ? 'text-branco' : 'text-cinza'}`}>R$1,00 cada</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            {/* OPÇÃO 2 */}
                            <TouchableOpacity style={styles.shadow} onPress={() => { selectBase("Médio", 12, require('../../../assets/medio.png')) }} className={`${customCart.base?.name === "Médio" ?  'bg-marron' : 'bg-branco'} w-full mb-4 p-3 flex justify-center rounded-[30px]`}>
                                <View className='flex-row'>
                                    <Image
                                        source={require('../../../assets/medio.png')}
                                        className='w-24 h-24 rounded-[20px]'
                                        resizeMode="cover"
                                    />
                                    <View className='flex-col ml-[5%]'>
                                        <Text className={`font-montserrat-bold text-[18px] ${customCart.base?.name === "Médio" ? 'text-branco' : 'text-cinza'}`}>Médio</Text>
                                        <Text className={`font-montserrat-light text-[12px] mt-2 ${customCart.base?.name === "Médio" ? 'text-branco' : 'text-[#6e6e6e]'}`}>Altura aprox.: 7 cm</Text>
                                        <Text className={`font-montserrat-light text-[12px] mt-2 ${customCart.base?.name === "Médio" ? 'text-branco' : 'text-cinza'}`}>R$2,00 cada</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>

                            {/* OPÇÃO 3 */}
                            <TouchableOpacity style={styles.shadow} onPress={() => { selectBase("Grande", 12, require('../../../assets/grande.png')) }} className={`${customCart.base?.name === "Grande" ?  'bg-marron' : 'bg-branco'} w-full mb-4 p-3 flex justify-center rounded-[30px]`}>
                                <View className='flex-row'>
                                    <Image
                                        source={require('../../../assets/grande.png')}
                                        className='w-24 h-24 rounded-[20px]'
                                        resizeMode="cover"
                                    />
                                    <View className='flex-col ml-[5%]'>
                                        <Text className={`font-montserrat-bold text-[18px] ${customCart.base?.name === "Grande" ? 'text-branco' : 'text-cinza'}`}>Grande</Text>
                                        <Text className={`font-montserrat-light text-[12px] mt-2 ${customCart.base?.name === "Grande" ? 'text-branco' : 'text-[#6e6e6e]'}`}>Altura aprox.: 12 cm</Text>
                                        <Text className={`font-montserrat-light text-[12px] mt-2 ${customCart.base?.name === "Grande" ? 'text-branco' : 'text-cinza'}`}>R$5,00 cada</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View className="flex-row justify-between gap-4 w-full px-4 mb-4">
                        <TouchableOpacity disabled className='flex-1 h-12 justify-center items-center opacity-50 bg-gray-200 rounded-full'>
                            <Text className='text-cinza font-montserrat-bold'>Regredir</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { moveStep(1) }} className='flex-1 h-12 justify-center items-center bg-marron rounded-full'>
                            <Text className='text-branco font-montserrat-bold'>Avançar</Text>
                        </TouchableOpacity>
                    </View>

                    <View className="px-4 mt-2">
                        <TouchableOpacity onPress={() => setModalVisible(true)} className='w-full h-12 bg-white border border-laranja rounded-full justify-center items-center'>
                            <Text className='text-laranja font-montserrat-bold'>Ver resumo da criação</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* BOTTOM SHEET MODAL */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View className="flex-1 justify-end bg-black/50">
                        {/* Área clicável invisível para fechar o modal ao clicar fora */}
                        <TouchableOpacity style={{ flex: 1 }} onPress={() => setModalVisible(false)} activeOpacity={1} />
                        
                        <View className="bg-branco rounded-t-[30px] p-6 shadow-lg h-[80%] w-full">
                            <View className="items-center mb-6">
                                <View className="w-12 h-1.5 bg-gray-300 rounded-full" />
                            </View>
                            
                            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                                <View className="flex-row justify-between items-center mb-4">
                                    <Text className={`text-2xl font-montserrat-bold text-cinza text-left`}>
                                        {customCart.base ? "Sua criação açucarada" : "Resumo vazio"}
                                    </Text>
                                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                                        <X size={24} color="#2e2e2e" />
                                    </TouchableOpacity>
                                </View>
                                
                                {customCart.base ? (
                                    <Image
                                        source={customCart.base.image}
                                        className="mt-2 w-full h-40 rounded-xl"
                                        resizeMode="contain"
                                    />
                                ) : (
                                    <View className="flex items-center justify-center h-40 bg-gray-200 rounded-xl w-full">
                                        <FileImage size={40} color="#a1a1aa" />
                                    </View>
                                )}

                                <Text className='text-cinza font-montserrat-bold text-lg mt-5'>Tipo de base</Text>
                                {customCart.base?.name ? (
                                    <Text className="text-cinza font-montserrat text-base text-left">{customCart.base.name}</Text>
                                ) : (
                                    <View className="h-3 bg-gray-300 rounded-md w-48 mt-2" />
                                )}

                                <View className={`${customCart.package ? 'flex' : 'hidden'}`}>
                                    <Text className='text-cinza font-montserrat-bold text-lg mt-5'>Tamanho do pacote</Text>
                                    {customCart.package?.package_size ? (
                                        <Text className="text-cinza font-montserrat text-base text-left">{customCart.package.package_size} unidades</Text>
                                    ) : (
                                        <View className="h-3 bg-gray-300 rounded-md w-48 mt-2" />
                                    )}
                                </View>

                                <View className={`${customCart.flavors ? 'flex' : 'hidden'}`}>
                                    <Text className='text-cinza font-montserrat-bold text-lg mt-5'>Sabores</Text>
                                    <Text className="text-base text-cinza font-montserrat text-left">
                                        {customCart.flavors ? customCart.flavors.join(", ") : ''}
                                    </Text>
                                </View>

                                <View className={`${customCart.color ? 'flex' : 'hidden'}`}>
                                    <Text className='text-cinza font-montserrat-bold text-lg mt-5'>Cor principal</Text>
                                    <View className='flex flex-row gap-2 mt-2'>
                                        {customCart.color?.map((color, index) => (
                                            <View
                                                key={index}
                                                style={{ backgroundColor: color.code }}
                                                className="w-6 h-6 border border-gray-300 rounded-full"
                                            ></View>
                                        ))}
                                    </View>
                                </View>

                                <View className={`${customCart.details ? 'flex' : 'hidden'}`}>
                                    <Text className='text-cinza font-montserrat-bold text-lg mt-5'>Detalhes</Text>
                                    <Text className="text-base text-cinza font-montserrat text-left">
                                        {customCart.details ? customCart.details.join(", ") : ''}
                                    </Text>
                                </View>

                                <View className={`${customCart.description ? 'flex' : 'hidden'}`}>
                                    <Text className='text-cinza font-montserrat-bold text-lg mt-5'>Descrição</Text>
                                    <Text className="text-base text-cinza font-montserrat text-left">
                                        {customCart.description ? customCart.description : ''}
                                    </Text>
                                </View>

                                <View className="mt-6 mb-4 h-[1px] w-full bg-gray-200 rounded-full"></View>

                                <View className="flex-row justify-between items-center">
                                    <Text className="text-sm text-cinza text-left font-montserrat-bold">
                                        Preço base
                                    </Text>
                                    {customCart.base?.price ? (
                                        <Text className="text-sm text-gray-500 text-right font-montserrat-medium">
                                            R${customCart.base.price.toFixed(2)}
                                        </Text>
                                    ) : (
                                        <View className="h-3 bg-gray-300 rounded-md w-16" />
                                    )}
                                </View>

                                <View className="flex-row justify-between items-center mt-2">
                                    <Text className="text-sm text-cinza text-left font-montserrat-bold">
                                        Taxa de customização
                                    </Text>
                                    {customCart.base ? (
                                        <Text className="text-sm text-gray-500 text-right font-montserrat-medium">
                                            R${customTax.toFixed(2)}
                                        </Text>
                                    ) : (
                                        <View className="h-3 bg-gray-300 rounded-md w-16" />
                                    )}
                                </View>

                                <View className={`${customCart.package ? 'flex-row' : 'hidden'} justify-between items-center mt-2`}>
                                    <Text className="text-sm text-cinza text-left font-montserrat-bold">
                                        Upgrade de pacote
                                    </Text>
                                    <Text className="text-sm text-gray-500 text-right font-montserrat-medium">
                                        {customCart.package ? `R$${customCart.package.package_price.toFixed(2)}` : ''}
                                    </Text>
                                </View>

                                <View className="mt-4 mb-4 h-[1px] w-full bg-gray-200 rounded-full"></View>

                                <View className="flex-row justify-between items-center mt-1">
                                    <Text className="text-base text-cinza text-left font-montserrat-bold">
                                        Total por pacote
                                    </Text>
                                    {customCart.package ? (
                                        <Text className="text-base text-laranja text-right font-montserrat-bold">
                                            {customCart.base ? `R$${packPrice.toFixed(2)}` : ''}
                                        </Text>
                                    ) : (
                                        <View className="h-3 bg-laranja opacity-50 rounded-md w-16" />
                                    )}
                                </View>

                                <View className="flex-row justify-between items-center mt-2">
                                    <Text className="text-sm text-cinza text-left font-montserrat-bold">
                                        Quantidade de pacotes
                                    </Text>
                                    <View className="flex-row items-center gap-3">
                                        <TouchableOpacity onPress={() => { decreaseQuantity() }} className="flex items-center justify-center w-8 h-8 rounded-md bg-transparent border-gray-300 border">
                                            <Minus color="#2e2e2e" size={16} />
                                        </TouchableOpacity>
                                        <Text className="text-cinza font-montserrat-semibold">{quantity}</Text>
                                        <TouchableOpacity onPress={() => { increaseQuantity() }} className="flex items-center justify-center w-8 h-8 rounded-md bg-transparent border-gray-300 border">
                                            <Plus color="#2e2e2e" size={16} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View className="flex-row justify-between items-center mt-7">
                                    <Text className='text-cinza font-montserrat-bold text-xl'>Total da compra</Text>
                                    {customCart.base ? (
                                        <Text className="text-xl text-laranja text-right font-montserrat-extrabold">
                                            R${(packPrice * quantity).toFixed(2)}
                                        </Text>
                                    ) : (
                                        <View className="h-4 bg-laranja opacity-50 rounded-md w-24" />
                                    )}
                                </View>

                                <TouchableOpacity className='w-full h-12 bg-laranja rounded-full justify-center items-center mt-7 mb-4'>
                                    <Text className='text-branco font-montserrat-bold'>Adicionar ao carrinho</Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    )
}





const styles = StyleSheet.create({
  shadow: {
    // iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Android
    elevation: 6,
  },
});