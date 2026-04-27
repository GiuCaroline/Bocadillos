import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Heart, Palette, Gift, Sparkle } from 'phosphor-react-native';

export default function CaminhoCustom({ currentStep, moveStep }) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ alignItems: 'center' }}
      className="flex flex-row px-6 py-3 w-fulll"
    >
      <TouchableOpacity style={styles.shadow} onPress={() => moveStep(0)} className="flex flex-row items-center">
        <View className="w-10 h-10 rounded-full bg-laranja items-center justify-center">
          <Text className='font-montserrat-extrabold text-branco text-[18px]'>1</Text>
        </View>
      </TouchableOpacity>

      <View className="h-1 w-8 bg-laranja" />

      <TouchableOpacity style={styles.shadow} onPress={() => moveStep(1)} className="flex flex-row items-center">
        <View className={`w-10 h-10 rounded-full items-center justify-center ${currentStep >= 1 ? 'bg-laranja' : 'bg-gray-300 dark:bg-gray-600'}`}>
          <Text className='font-montserrat-extrabold text-branco text-[18px]'>2</Text>
        </View>
      </TouchableOpacity>

      <View className={`h-1 w-8 ${currentStep >= 1 ? 'bg-laranja' : 'bg-gray-300'}`} />

      <TouchableOpacity style={styles.shadow} onPress={() => moveStep(2)} className="flex flex-row items-center">
        <View className={`w-10 h-10 rounded-full items-center justify-center ${currentStep >= 2 ? 'bg-laranja' : 'bg-gray-300 dark:bg-gray-600'}`}>
          <Text className='font-montserrat-extrabold text-branco text-[18px]'>3</Text>
        </View>
      </TouchableOpacity>

      <View className={`h-1 w-8 ${currentStep >= 2 ? 'bg-laranja' : 'bg-gray-300'}`} />

      <TouchableOpacity style={styles.shadow} onPress={() => moveStep(3)} className="flex flex-row items-center">
        <View className={`w-10 h-10 rounded-full items-center justify-center ${currentStep >= 3 ? 'bg-laranja' : 'bg-gray-300 dark:bg-gray-600'}`}>
          <Text className='font-montserrat-extrabold text-branco text-[18px]'>4</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
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