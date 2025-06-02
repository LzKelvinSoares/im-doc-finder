import { Image } from 'expo-image';
import { FlatList, Pressable, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { PersonList } from '@/components/PersonList';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { usePeople } from '@/hooks/usePeople';
import { Person } from '@/types';
import { useState } from 'react';



export default function HomeScreen() {
  const people = usePeople();
  const [openedPerson, setOpenedPerson] = useState<Person | null>(null);

  const openPerson = (person: Person) => {
    setOpenedPerson(person);
  }

  const closePerson = () => {
    setOpenedPerson(null);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>

      {
        !!openedPerson ? (
          <PersonList
            person={openedPerson}
            closePerson={closePerson}
          />
        ) : (
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
                <Pressable onPress={() => openPerson(item)}>
                  <ThemedView style={styles.titleContainer}>
                    <ThemedText>{item.name}</ThemedText>
                  </ThemedView>
                </Pressable>
              </>
            )}
          />
        )
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
    color: '#FAFAFA'

  },
  materialIcons: {
    color: '#FAFAFA',
  },
  stepContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
