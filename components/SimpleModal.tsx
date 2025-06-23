import { Modal, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "./ThemedText";
import { CustomButton } from "./ui/CustomButton";

interface SimpleModalProps {
    isOpen: boolean;
    onClose: () => void;
    confirm?: () => void;
    title: string;
    loading?: boolean;
    children: React.ReactNode;
}

export function SimpleModal({
    isOpen,
    loading,
    onClose,
    title,
    confirm,
    children
}: SimpleModalProps) {
    return (
        <SafeAreaView style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isOpen}
                onRequestClose={onClose}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <ThemedText type="title" darkColor="#363636">
                            {title}
                        </ThemedText>
                        <View style={styles.contentContainer}>
                            {children}
                        </View>
                        <View style={{
                            ...styles.actionButtonContainer,
                            ...(!confirm && {
                                justifyContent: 'center'
                            })
                        }}>
                            <CustomButton
                                onPress={onClose}
                                title="Fechar"
                                style={{
                                    backgroundColor: '#FFFFFF',
                                    border: '1px solid',
                                }}
                                textStyle={{ color: '#363636' }}
                                disabled={loading}
                            />
                            {!!confirm &&
                                <CustomButton
                                    onPress={confirm}
                                    title="Confirmar"
                                    disabled={loading}
                                />
                            }
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    headerContainer: {
        width: '100%',
        marginBottom: 20,
    },
    contentContainer: {
        width: '100%',
        marginTop: 15,
        marginBottom: 25,
    },
    actionButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    }
});