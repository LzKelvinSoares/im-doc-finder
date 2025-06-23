import { StyleSheet } from "react-native";
import { SimpleModal } from "./SimpleModal";
import { ThemedText } from "./ThemedText";

interface AlertModalProps {
    onClose: () => void;
    isOpen: boolean;
    textContent?: string | null;
}

export function AlertModal({
    onClose,
    isOpen,
    textContent
}: AlertModalProps) {
    return (
        <SimpleModal
            isOpen={isOpen}
            onClose={onClose}
            title="Atenção"
            loading={false}
        >
            <ThemedText type='default' style={styles.modalText}>
                {textContent || ''}
            </ThemedText>
        </SimpleModal>
    )
}



const styles = StyleSheet.create({
    modalText: {
        textAlign: 'center',
        color: '#363636'
    },
});