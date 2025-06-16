import { useSQLiteCRUD } from '@/hooks/useSQLiteCRUD';
import { Person } from '@/types';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';

interface IPeopleContext {
    people?: Person[];
    addPerson: (person: Person) => void;
}

export const peopleContext = createContext<IPeopleContext>({
    addPerson: () => { },
});

export function ProvidePeople({ children }: PropsWithChildren<{}>) {
    const crud = useSQLiteCRUD('people');
    const [people, setPeople] = useState<Person[]>([]);

    useEffect(() => {
        async function setup() {
            const result = await crud.getAllAsync<Person>();
            const resultWithDocuments = result.map(person => ({
                ...person,
                documents: [],
            }));
            setPeople(resultWithDocuments);
        }
        setup();
    }, []);

    const addPerson = useCallback(async (person: Person) => {
        await crud.insertAsync(person, ['documents']);
        setPeople(current => {
            const newPeople = [...current, {
                ...person,
                documents: [],
            }];
            return newPeople;
        });
    }, [setPeople]);
    return (
        <peopleContext.Provider
            value={{
                people,
                addPerson
            }}
        >
            {children}
        </peopleContext.Provider>
    );
}

export function usePeopleContext() {
    return useContext(peopleContext);
}
