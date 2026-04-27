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

    function goToStep(stepIndex) {
        if (stepIndex >= 0 && stepIndex < steps.length) {
        setCurrentStep(stepIndex);
        }
    }

    return (
        <ScrollView className="flex-1 min-h-screen bg-background">  
            <NavTop />
            <View className="mt-10 w-full items-center">
                <CaminhoCustom currentStep={currentStep} moveStep={goToStep} />
            </View>

            <View className="p-6 flex-1 w-full">
                {steps[currentStep] === "Passo1" && <Passo1 moveStep={goToStep} />}
                {steps[currentStep] === "Passo2" && <Passo2 moveStep={goToStep} />}
                {steps[currentStep] === "Passo3" && <Passo3 moveStep={goToStep} />}
                {steps[currentStep] === "Passo4" && <Passo4 moveStep={goToStep} />}
            </View>
            
            <Nav
                active="Especial"
                onChange={(r) => navigation.navigate(r)}
            />
        </ScrollView>
    );
}