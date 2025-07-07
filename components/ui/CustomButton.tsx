import { Pressable, StyleSheet, Text } from "react-native";

interface ICustomButtonProps {
    onPress: () => void;
    title?: string;
    style?: object;
    textStyle?: object;
    accessibilityLabel?: string;
    disabled?: boolean;
}

export function CustomButton({ onPress, title, style, textStyle, accessibilityLabel, disabled }: ICustomButtonProps) {
    return (
        <Pressable
            style={[styles.button, styles.buttonClose, style, disabled && { opacity: 0.5 }]}
            onPress={onPress}
            accessibilityLabel={accessibilityLabel}
            disabled={disabled}
        >
            <Text style={[styles.textStyle, textStyle]}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 15,
        padding: 10,
        elevation: 2,
        cursor: 'pointer',
    },
    buttonClose: {
        backgroundColor: '#19C159',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
