import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        height: 48,
        // backgroundColor: colors.primary,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20,
    },

    pressed: {
        opacity: 0.8,
    },

    disabled: {
        opacity: 0.5,
    },

    text: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});
