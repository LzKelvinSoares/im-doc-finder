import { useSQLiteCRUD } from '@/hooks/useSQLiteCRUD';
import { Person } from '@/types';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';

interface IPeopleContext {
    people?: Person[];
    loading?: boolean;
    alertTextContent?: string | null;
    getById: (id: string) => Promise<Person> | undefined;
    addPerson: (person: Person) => void;
    deletePerson: (person: Person) => void;
    setAlertTextContent: (text: string | null) => void;
}

export const peopleContext = createContext<IPeopleContext>({
    addPerson: () => { },
    deletePerson: () => { },
    getById: () => undefined,
    setAlertTextContent: () => { },
});

export function ProvidePeople({ children }: PropsWithChildren<{}>) {
    const crud = useSQLiteCRUD('people');
    const [people, setPeople] = useState<Person[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [alertTextContent, setAlertTextContent] = useState<string | null>(null);

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
        const id = await crud.insertAsync(person, ['documents']);
        setPeople(current => {
            const newPeople = [...current, {
                ...person,
                id,
                documents: [],
            }];
            return newPeople;
        });
        setLoading(false);
        setAlertTextContent(`${person.name} foi adicionado(a) com sucesso!`);
    }, [setPeople]);

    const deletePerson = useCallback(async (person: Person) => {
        setLoading(true);
        await crud.deleteAsync(person.id.toString());
        setPeople(current => {
            const newPeople = [...current.filter(p => p.id !== person.id)];
            return newPeople;
        });
        setLoading(false);
        setAlertTextContent(`${person.name} foi removido(a) com sucesso!`);
    }, [setPeople]);

    const getById = useCallback(async (id: string) => {
        const person = await crud.getAllByFieldNameAsync<Person>('id', id);
        return person[0];
    }, [crud]);

    return (
        <peopleContext.Provider
            value={{
                people,
                loading,
                alertTextContent,
                setAlertTextContent,
                addPerson,
                deletePerson,
                getById
            }}
        >
            {children}
        </peopleContext.Provider>
    );
}

export function usePeopleContext() {
    return useContext(peopleContext);
}
