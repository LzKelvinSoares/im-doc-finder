import { PersonDocumentList } from "@/components/Person/Documents/PersonDocumentList";
import ParallaxLayout from "@/components/ui/ParallaxLayout";
import { ProvideDocument, usePeopleContext } from "@/providers";
import { Person } from "@/types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";

export default function UserDetails() {
  const { id } = useLocalSearchParams();
  const [openedPerson, setOpenedPerson] = useState<Person | null>(null);
  const { getById } = usePeopleContext();

  useEffect(() => {
    getById(id.toString())?.then((person) => {
      ;
      if (person) {
        setOpenedPerson(person);
      } else {
        setOpenedPerson(null);
      }
    });
  }, [id, getById, setOpenedPerson]);

  const router = useRouter();

  const closePerson = () => {
    setOpenedPerson(null);
    router.push('/');
  };

  return (
    <ParallaxLayout>
      <ProvideDocument personId={id.toString()}>
        {
          !!openedPerson &&
          <PersonDocumentList
            person={openedPerson}
            closePerson={closePerson}
          />
        }
      </ProvideDocument>
    </ParallaxLayout>
  )
}


const styles = StyleSheet.create({
  reactLogo: {
    height: '100%',
    width: '15%',
    left: 0,
    bottom: 0,
    margin: 'auto'
  },
});