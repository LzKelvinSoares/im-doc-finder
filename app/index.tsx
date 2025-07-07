import { FlatList, Pressable, StyleSheet } from 'react-native';

import { AlertModal } from '@/components/AlertModal';
import { AddPerson } from '@/components/Person/AddPerson';
import { SimpleModal } from '@/components/SimpleModal';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxLayout from '@/components/ui/ParallaxLayout';
import { usePeopleContext } from '@/providers';
import { Person } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function HomeScreen() {
  const {
    people,
    deletePerson,
    loading,
    alertTextContent,
    setAlertTextContent
  } = usePeopleContext();
  const [deletingPerson, setDeletingPerson] = useState<Person | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const router = useRouter();

  const openPerson = (person: Person) => {
    router.push(`/users/${person.id}`);
  }

  const openDeletePerson = (person: Person) => {
    setDeletingPerson(person);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deletingPerson) {
      await deletePerson(deletingPerson);
      setDeletingPerson(null);
      setDeleteModalOpen(false);
    }
  };

  return (

    <ParallaxLayout>
      <AddPerson />

      <FlatList
        data={people}
        style={styles.stepContainer}
        renderItem={({ item, index }) => (
          <>
            {index === 0 && (
              <ThemedText type="title" style={{ margin: 12 }}>
                Pessoas
              </ThemedText>
            )}
            <ThemedView style={styles.titleContainer}>
              <Pressable onPress={() => openPerson(item)}>
                <ThemedText>{item.name}</ThemedText>
              </Pressable>
              <Pressable onPress={() => openDeletePerson(item)}>
                <MaterialIcons size={28} name={'delete'} style={styles.materialIcons} />
              </Pressable>
            </ThemedView>
          </>
        )}
      />

      {
        deleteModalOpen && deletingPerson && (
          <SimpleModal
            title="Excluir Pessoa"
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            confirm={handleConfirmDelete}
            loading={loading}
          >
            <ThemedText type='default' style={styles.modalText}>
              Você tem certeza que deseja excluir {deletingPerson?.name}?
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
    </ParallaxLayout>

  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    margin: 12,
    color: '#FAFAFA',
    display: 'flex',
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
