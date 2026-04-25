import { View, TextInput } from "react-native";

export function Input(
        { seguranca, icon: Icon, placeholder, keyboardType, onChangeText, value }
    ){
    return(
        <View className="flex-row items-center w-[320px] border-b border-background mb-4 mt-4">
            {Icon && <Icon size={26} color="#F5E6CA" weight="regular" />}
            <TextInput
                className='flex-1 text-[16px] px-[2%] ml-2 font-montserrat text-branco placeholder:text-background'
                secureTextEntry={seguranca}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                keyboardType={keyboardType}
            />
        </View>
    )
}