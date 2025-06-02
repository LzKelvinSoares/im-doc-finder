import { Pressable, StyleSheet, Text } from "react-native";

interface ICustomButtonProps {
    onPress: () => void;
    title?: string;
    style?: object;
    accessibilityLabel?: string;
}

export function CustomButton({ onPress, title, style, accessibilityLabel }: ICustomButtonProps) {
    return (
        <Pressable
            style={[styles.button, styles.buttonClose, style]}
            onPress={onPress}
            accessibilityLabel={accessibilityLabel}>
            <Text style={styles.textStyle}>{title}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
