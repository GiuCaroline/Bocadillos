import { View, Text, Pressable, StyleSheet } from "react-native";
import {
  House,
  Sparkle,
  ForkKnife,
  User,
} from "phosphor-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function Nav({ active, onChange }){
  const insets = useSafeAreaInsets();

    return(
        <View
            style={[{ paddingBottom: insets.bottom > 0 ? insets.bottom : 8 }, styles.sombra]}
            className="absolute bottom-0 w-full bg-background flex-row justify-around py-[2%] items-center"
            >
            <Tab
                label="Home"
                active={active === "Home"}
                onPress={() => onChange("Home")}
                icon={House}
            />

            <Tab
                label="Loja"
                active={active === "Loja"}
                onPress={() => onChange("Loja")}
                icon={ForkKnife}
            />

            <Tab
                label="Especial"
                active={active === "Especial"}
                onPress={() => onChange("Especial")}
                icon={Sparkle}
            />

            <Tab
                label="Perfil"
                active={active === "Perfil"}
                onPress={() => onChange("Perfil")}
                icon={User}
            />
        </View>
    )
}

function Tab({ label, icon: Icon, active, onPress }) {
    return (
        <Pressable className="items-center justify-center" onPress={onPress}>

        <Icon
            size={24}
            weight={active ? "fill" : "light"}
            className="font-cinza"
        />

        <Text className="text-[11px] text-cinza font-montserrat">
            {label}
        </Text>
        </Pressable>
    );
    }



const styles = StyleSheet.create({
    sombra: {
        // iOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.25,
        shadowRadius: 5,
        // Android
        elevation: 10,
    }
});