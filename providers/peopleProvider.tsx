import { useSQLiteCRUD } from '@/hooks/useSQLiteCRUD';
import { Person } from '@/types';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';

interface IPeopleContext {
    people?: Person[];
    loading?: boolean;
    addPerson: (person: Person) => void;
    deletePerson: (person: Person) => void;
}

export const peopleContext = createContext<IPeopleContext>({
    addPerson: () => { },
    deletePerson: () => { },
});

export function ProvidePeople({ children }: PropsWithChildren<{}>) {
    const crud = useSQLiteCRUD('people');
    const [people, setPeople] = useState<Person[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

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
        setLoading(true);
        await crud.insertAsync(person, ['documents']);
        setPeople(current => {
            const newPeople = [...current, {
                ...person,
                documents: [],
            }];
            return newPeople;
        });
        setLoading(false);
    }, [setPeople]);

    const deletePerson = useCallback(async (person: Person) => {
        setLoading(true);
        await crud.deleteAsync(person.id);
        setPeople(current => {
            const newPeople = [...current.filter(p => p.id !== person.id)];
            return newPeople;
        });
        setLoading(false);
    }, [setPeople]);

    return (
        <peopleContext.Provider
            value={{
                people,
                loading,
                addPerson,
                deletePerson
            }}
        >
            {children}
        </peopleContext.Provider>
    );
}

export function usePeopleContext() {
    return useContext(peopleContext);
}
