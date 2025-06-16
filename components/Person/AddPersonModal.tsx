import { usePeopleContext } from "@/providers";
import { Person } from "@/types";
import { useState } from "react";
import { Modal, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { v4 as uuid } from 'uuid';
import { ThemedText } from "../ThemedText";
import { CustomButton } from "../ui/CustomButton";

interface IAddPersonModalProps {
    onClose: () => void;
    isOpen: boolean;
}

export function AddPersonModal({
    onClose,
    isOpen
}: IAddPersonModalProps) {
    const { addPerson } = usePeopleContext();
    const [text, onChangeText] = useState('');

    const submitPerson = () => {
        const newPerson: Person = {
            id: uuid(),
            name: text,
            documents: []
        };

        addPerson(newPerson);
        onClose();
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isOpen}
                    onRequestClose={onClose}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.headerContainer}>
                                <ThemedText type="title" darkColor="#363636">
                                    Nova Pessoa
                                </ThemedText>
                            </View>
                            <View style={styles.contentContainer}>
                                <TextInput
                                    style={styles.input}
                                    onChangeText={onChangeText}
                                    value={text}
                                />
                            </View>
                            <View style={styles.actionButtonContainer}>
                                <CustomButton
                                    onPress={onClose}
                                    title="Fechar"
                                    style={{ backgroundColor: '#FFFFFF', border: '1px solid' }}
                                    textStyle={{ color: '#363636' }}
                                />
                                <CustomButton
                                    onPress={submitPerson}
                                    title="Salvar"
                                    disabled={!text}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </SafeAreaProvider>
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
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    headerContainer: {
        width: '100%',
        marginBottom: 20,
    },
    contentContainer: {
        width: '100%',
        marginBottom: 20,
    },
    actionButtonContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    }
});