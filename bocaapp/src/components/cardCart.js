import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Plus, Minus, Trash } from "phosphor-react-native";

export default function CardCart({ cartinfo, products, onIncrease, onDecrease, onRemove }) {
    const product = products ? products.find(item => item.id === cartinfo.id) : undefined;
    const sizeText = cartinfo.size === 'unit' ? 'Unidade' : `Pacote (${product?.package_size || '-'})`;
    const unitPrice = cartinfo.size === 'unit' ? product?.price : product?.package_price;
    const cartPrice = Number(unitPrice) || 0;

    // Suporta imagem local (require) ou URL remota (string), lendo image ou image_url
    const imageSource = (() => {
        const src = product?.image || product?.image_url;
        if (!src) return null;
        if (typeof src === 'string') return { uri: src };
        return src; // require() retorna um número
    })();

    return (
        <View className="p-5 rounded-xl border border-(--c25) bg-transparent w-full">
            <View className="flex-row gap-4">
                <View className="w-[80px] h-[80px] aspect-square rounded-lg overflow-hidden">
                    {imageSource ? (
                        <Image
                            source={imageSource}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    ) : (
                        <View className="w-full h-full bg-gray-200 rounded-lg" />
                    )}
                </View>

                <View className='flex-col flex-1'>
                    <View className='flex-row justify-between items-start'>
                        <Text className='dark:text-white text-(--c27) font-bold text-[16px] flex-1 mr-2' numberOfLines={2}>
                            {product?.isCustom ? `${product?.name} (Customizado)` : product?.name}
                        </Text>
                        <TouchableOpacity onPress={() => onRemove && onRemove(cartinfo.id, cartinfo.size)} className="mt-1">
                            <Trash className='dark:text-white text-(--c27)' size={20} />
                        </TouchableOpacity>
                    </View>

                    {product?.isCustom ? (
                        <View className='flex-col mt-2'>
                            {product.flavors?.length > 0 && (
                                <Text className='text-(--c11) text-[12px]'>
                                    <Text className="font-bold">Sabores: </Text>
                                    {product.flavors.join(', ')}
                                </Text>
                            )}
                            {product.colors?.length > 0 && (
                                <Text className='text-(--c11) text-[12px]'>
                                    <Text className="font-bold">Cores: </Text>
                                    {product.colors.map(c => c.name).join(', ')}
                                </Text>
                            )}
                            {product.details?.length > 0 && (
                                <Text className='text-(--c11) text-[12px]'>
                                    <Text className="font-bold">Detalhes: </Text>
                                    {product.details.join(', ')}
                                </Text>
                            )}
                            {product.descript && (
                                <Text className='text-(--c11) text-[12px] mt-1'>{product.descript}</Text>
                            )}
                        </View>
                    ) : (
                        <Text className='text-(--c11) text-[12px] mt-1'>{product?.descript}</Text>
                    )}

                    <View className='items-start mt-3'>
                        <View className='border border-(--c8) px-2 py-[2px] rounded-md'>
                            <Text className='text-[10px] text-(--c8)'>
                                {sizeText}
                            </Text>
                        </View>
                    </View>

                    <View className="flex-row items-center justify-between mt-4">
                        <View className="flex-row items-center gap-3">
                            <TouchableOpacity
                                onPress={() => onDecrease && onDecrease(cartinfo.id, cartinfo.size)}
                                className="items-center justify-center w-7 h-7 rounded-md bg-transparent border-(--c27) border dark:border-white"
                            >
                                <Minus className="dark:text-white text-(--c27)" size={14} />
                            </TouchableOpacity>

                            <Text className="dark:text-white text-(--c27) font-bold text-[14px]">
                                {cartinfo.quantity}
                            </Text>

                            <TouchableOpacity
                                onPress={() => onIncrease && onIncrease(cartinfo.id, cartinfo.size)}
                                className="items-center justify-center w-7 h-7 rounded-md bg-transparent border-(--c27) border dark:border-white"
                            >
                                <Plus className="dark:text-white text-(--c27)" size={14} />
                            </TouchableOpacity>
                        </View>

                        <View className='items-end'>
                            <Text className='text-(--c20) font-light text-[10px]'>
                                R${cartPrice.toFixed(2)} / {sizeText}
                            </Text>
                            <Text className='text-(--c4) font-bold text-[18px]'>
                                R${(cartPrice * cartinfo.quantity).toFixed(2)}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}
