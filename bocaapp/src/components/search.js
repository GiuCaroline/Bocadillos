import { View, TextInput, StyleSheet } from "react-native";
import { MagnifyingGlass } from "phosphor-react-native";

export function Search({ value, onChange }) {
  return (
    <View
      className="w-full h-[45px] bg-branco rounded-full flex-row items-center px-2"
      style={styles.shadow}
    >
        <TextInput
            placeholder="Pesquisar..."
            value={value}
            onChangeText={onChange}
            className="flex-1 font-montserrat-regular text-[15px] text-black"
            placeholderTextColor={'#5e5e5e'}
        />

        <MagnifyingGlass size={30} weight="light" color="#2e2e2e" />
    </View>
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