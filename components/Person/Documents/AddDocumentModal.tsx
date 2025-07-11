import { SimpleModal } from "@/components/SimpleModal";
import { ThemedText } from "@/components/ThemedText";
import { useDocumentContext } from "@/providers";
import { Document } from "@/types";
import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import uuid from 'react-native-uuid';
import { AddDocumentIconDropdown } from "./AddDocumentIconDropdown";

interface IAddDocumentModalProps {
    onClose: () => void;
    isOpen: boolean;
}

export function AddDocumentModal({
    onClose,
    isOpen,
}: IAddDocumentModalProps) {
    const [title, onChangeTitle] = useState('');
    const [icon, onChangeIcon] = useState('');
    const [url, onChangeUrl] = useState('');

    const { addDocument } = useDocumentContext();

    const submitDocument = () => {
        const newDocument: Document = {
            id: uuid.v4(),
            icon,
            title,
            url
        };

        addDocument(newDocument);
        onClose();
    };

    return (
        <SimpleModal
            isOpen={isOpen}
            onClose={onClose}
            title="Novo Documento"
            confirm={submitDocument}
            loading={false}
        >
            <View style={styles.contentContainer}>
                <View style={styles.contentContainer}>
                    <ThemedText style={{ color: '#363636' }}>Nome: </ThemedText>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeTitle}
                        value={title}
                    />
                </View>
                <View style={styles.contentContainer}>
                    <ThemedText style={{ color: '#363636' }}>Icon: </ThemedText>
                    <AddDocumentIconDropdown
                        onChange={onChangeIcon}
                    />

                </View>
                <View style={styles.contentContainer}>
                    <ThemedText style={{ color: '#363636' }}>URL: </ThemedText>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeUrl}
                        value={url}
                    />
                </View>
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