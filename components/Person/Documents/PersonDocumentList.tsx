import { AlertModal } from "@/components/AlertModal";
import { SimpleModal } from "@/components/SimpleModal";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useDocumentContext } from "@/providers";
import { Document, Person } from "@/types";
import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Linking, Pressable, StyleSheet } from "react-native";
import { AddDocument } from "./AddDocument";

interface IPersonDocumentListProps {
    person: Person;
    closePerson?: () => void;
}

export function PersonDocumentList({
    person,
    closePerson
}: IPersonDocumentListProps) {
    const {
        documents,
        deleteDocument,
        loading,
        alertTextContent,
        setAlertTextContent
    } = useDocumentContext();
    const [deletingDocument, setDeletingDocument] = useState<Document | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);


    const openWEB = (item: Document) => {
        Linking.openURL(item.url);
    };

    const openDeleteDocument = (item: Document) => {
        setDeletingDocument(item);
        setDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (deletingDocument) {
            await deleteDocument(deletingDocument);
            setDeletingDocument(null);
            setDeleteModalOpen(false);
        }
    };

    return (
        <>
            <Pressable onPress={closePerson}>
                <ThemedView style={styles.titleContainer}>
                    <MaterialIcons name="chevron-left" size={28} style={styles.materialIcons} />
                    <ThemedText>Voltar</ThemedText>
                </ThemedView>
            </Pressable>

            <ThemedText type="title" style={{ marginLeft: 12 }}>
                {person.name} | Documentos
            </ThemedText>
            <AddDocument />
            <FlatList
                data={documents}
                style={styles.stepContainer}
                renderItem={({ item }) => (
                    <>
                        <ThemedView style={styles.documentsContainer}>
                            <Pressable onPress={() => openWEB(item)}>
                                <ThemedView style={styles.textContainer}>
                                    <MaterialIcons size={28} name={item.icon} style={styles.materialIcons} />
                                    <ThemedText>{item.title}</ThemedText>
                                </ThemedView>
                            </Pressable>
                            <Pressable onPress={() => openDeleteDocument(item)}>
                                <MaterialIcons size={28} name={'delete'} style={styles.materialIcons} />
                            </Pressable>
                        </ThemedView>
                    </>
                )}
            />

            {
                deleteModalOpen && deletingDocument && (
                    <SimpleModal
                        title={`Excluir Documento de ${person.name}`}
                        isOpen={deleteModalOpen}
                        onClose={() => setDeleteModalOpen(false)}
                        confirm={handleConfirmDelete}
                        loading={loading}
                    >
                        <ThemedText type='default' style={styles.modalText}>
                            Você tem certeza que deseja excluir {deletingDocument?.title}?
                        </ThemedText>
                    </SimpleModal>
                )
            }
            {
                !!alertTextContent &&
                <AlertModal
                    isOpen={!!alertTextContent}
                    onClose={() => setAlertTextContent(null)}
                    textContent={alertTextContent}
                />
            }
        </>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
        margin: 12,
        color: '#FAFAFA',
        display: 'flex',
    },
    documentsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
        margin: 12,
        color: '#FAFAFA',
        display: 'flex',
        justifyContent: 'space-between',
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    materialIcons: {
        color: '#FAFAFA',
    },
    stepContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    modalText: {
        textAlign: 'center',
        color: '#363636'
    },
});