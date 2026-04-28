import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Sparkle } from 'phosphor-react-native';
import { NavTop } from "../components/navTop";
import { Nav } from "../components/nav";
import CaminhoCustom from '../components/caminhoCustom';
import { Passo1 } from '../components/Custom/passo1';
import { Passo2 } from '../components/Custom/passo2';
import { Passo3 } from '../components/Custom/passo3';
import { Passo4 } from '../components/Custom/passo4';
import { useNavigation } from '@react-navigation/native';

export function Especial(){
    const navigation = useNavigation();
    const [currentStep, setCurrentStep] = useState(0);
    const steps = ["Passo1", "Passo2", "Passo3", "Passo4"];

    const [quantity, setQuantity] = useState(1);
    const [customCart, setCustomCart] = useState({
        quantity: 1,
        package: { package_size: 10, package_price: 0, package_name: 'Pequeno' },
        description: '',
        flavors: []
    });

    function goToStep(stepIndex) {
        if (stepIndex >= 0 && stepIndex < steps.length) {
        setCurrentStep(stepIndex);
        }
    }

    return (
        <View className="flex-1 bg-background">
            <NavTop />
            
            <View className="mt-10 w-full items-center">
                <CaminhoCustom currentStep={currentStep} moveStep={goToStep} />
            </View>

            <View className="flex-1 w-full pb-[80px]">
                {steps[currentStep] === "Passo1" && <Passo1 moveStep={goToStep} customCart={customCart} setCustomCart={setCustomCart} quantity={quantity} setQuantity={setQuantity} />}
                {steps[currentStep] === "Passo2" && <Passo2 moveStep={goToStep} customCart={customCart} setCustomCart={setCustomCart} quantity={quantity} setQuantity={setQuantity} />}
                {steps[currentStep] === "Passo3" && <Passo3 moveStep={goToStep} customCart={customCart} setCustomCart={setCustomCart} quantity={quantity} setQuantity={setQuantity} />}
                {steps[currentStep] === "Passo4" && <Passo4 moveStep={goToStep} customCart={customCart} setCustomCart={setCustomCart} quantity={quantity} setQuantity={setQuantity} />}
            </View>
            
            <Nav
                active="Especial"
                onChange={(r) => navigation.navigate(r)}
            />
        </View>
    );
}