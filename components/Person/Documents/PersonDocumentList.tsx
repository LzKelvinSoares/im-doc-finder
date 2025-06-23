import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Document, Person } from "@/types";
import { MaterialIcons } from "@expo/vector-icons";
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

    const openWEB = (item: Document) => {
        Linking.openURL(item.url);
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
            <AddDocument person={person} />
            <FlatList
                data={person.documents}
                style={styles.stepContainer}
                renderItem={({ item, index }) => (
                    <>
                        <Pressable onPress={() => openWEB(item)}>
                            <ThemedView style={styles.titleContainer}>
                                <MaterialIcons size={28} name={item.icon} style={styles.materialIcons} />
                                <ThemedText>{item.title}</ThemedText>
                            </ThemedView>
                        </Pressable>
                    </>
                )}
            />
        </>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
        margin: 12,
        color: '#FAFAFA'

    },
    materialIcons: {
        color: '#FAFAFA',
    },
    stepContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});