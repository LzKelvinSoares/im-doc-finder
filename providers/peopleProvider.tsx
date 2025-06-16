import { Person } from '@/types';
import { createContext, PropsWithChildren, useCallback, useContext, useState } from 'react';
import SessionStorage from 'react-native-session-storage';

interface IPeopleContext {
    people?: Person[];
    addPerson: (person: Person) => void;
}

export const peopleContext = createContext<IPeopleContext>({
    addPerson: () => { },
});

export function ProvidePeople({ children }: PropsWithChildren<{}>) {
    const sessionPeople = SessionStorage.getItem('@people') as Person[];
    const [people, setPeople] = useState<Person[]>(sessionPeople || []);
    const value = SessionStorage.getItem('@storage_key');

    const addPerson = useCallback((person: Person) => {
        setPeople(current => {
            const newPeople = [...current, person];
            SessionStorage.setItem('@people', newPeople);
            return newPeople;
        });
    }, [setPeople]);
    return (
        <peopleContext.Provider
            value={{
                people,
                addPerson,
            }}
        >
            {children}
        </peopleContext.Provider>
    );
}

export function usePeopleContext() {
    return useContext(peopleContext);
}
