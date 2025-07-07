import { Image } from 'expo-image';
import { FlatList, Pressable, StyleSheet } from 'react-native';

import { AlertModal } from '@/components/AlertModal';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { AddPerson } from '@/components/Person/AddPerson';
import { PersonDocumentList } from '@/components/Person/Documents/PersonDocumentList';
import { SimpleModal } from '@/components/SimpleModal';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ProvideDocument, usePeopleContext } from '@/providers';
import { Person } from '@/types';
import { MaterialIcons } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite';
import { useState } from 'react';

export default function HomeScreen() {
  const {
    people,
    deletePerson,
    loading,
    alertTextContent,
    setAlertTextContent
  } = usePeopleContext();
  const [openedPerson, setOpenedPerson] = useState<Person | null>(null);
  const [deletingPerson, setDeletingPerson] = useState<Person | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const db = useSQLiteContext();

  const openPerson = (person: Person) => {
    setOpenedPerson(person);
  }

  const closePerson = () => {
    setOpenedPerson(null);
  };

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
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#000000' }}
      headerImage={
        <Image
          source={require('@/assets/images/splash-icon.png')}
          style={styles.reactLogo}
        />
      }>
      {
        !!openedPerson ? (

          <ProvideDocument personId={openedPerson.id.toString()}>
            <PersonDocumentList
              person={openedPerson}
              closePerson={closePerson}
            />
          </ProvideDocument>

        ) : (
          <>
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
          </>
        )
      }

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

    </ParallaxScrollView>
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
  reactLogo: {
    height: '100%',
    width: '15%',
    left: 0,
    bottom: 0,
    margin: 'auto'
  },
  modalText: {
    textAlign: 'center',
    color: '#363636'
  },
});
