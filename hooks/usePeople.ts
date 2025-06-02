import { Person } from "@/types";
import { useDocuments } from "./useDocuments";

export function usePeople() {
    const documents = useDocuments();
    const people: Person[] = [
        {
            id: '1',
            name: 'Kelvin',
            documents: []
        },
        {
            id: '2',
            name: 'Thuanny',
            documents: []
        },
    ];

    people.forEach((person) => {
        person.documents = documents;
    });

    return people;
}