import { usePeopleContext } from "@/providers";
import { Person } from "@/types";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { v4 as uuid } from 'uuid';
import { SimpleModal } from "../SimpleModal";

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
        <SimpleModal
            isOpen={isOpen}
            onClose={onClose}
            title="Nova Pessoa"
            confirm={submitPerson}
            loading={false}
        >
            <View style={styles.contentContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                />
            </View>
        </SimpleModal>
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