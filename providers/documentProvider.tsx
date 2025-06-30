import { useSQLiteCRUD } from '@/hooks/useSQLiteCRUD';
import { Document, DocumentCRUD } from '@/types';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';

interface IDocumentContext {
    documents?: Document[];
    loading?: boolean;
    alertTextContent?: string | null;
    addDocument: (document: Document) => void;
    deleteDocument: (document: Document) => void;
    setAlertTextContent: (text: string | null) => void;
}

export const documentContext = createContext<IDocumentContext>({
    addDocument: () => { },
    deleteDocument: () => { },
    setAlertTextContent: () => { },
});

export function ProvideDocument({ personId, children }: PropsWithChildren<{ personId: string }>) {
    const crud = useSQLiteCRUD('documents');
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [alertTextContent, setAlertTextContent] = useState<string | null>(null);

    useEffect(() => {
        async function setup() {
            const result = await crud.getAllByFieldNameAsync<Document>('personId', personId);
            setDocuments(result);
        }
        setup();
    }, []);

    const addDocument = useCallback(async (document: Document) => {
        setLoading(true);
        const id = await crud.insertAsync<DocumentCRUD>({ ...document, personId }, []);
        setDocuments(current => {
            const newDocuments = [...current, { ...document, id }];
            return newDocuments;
        });
        setLoading(false);
        setAlertTextContent(`${document.title} foi adicionado(a) com sucesso!`);
    }, [setDocuments]);

    const deleteDocument = useCallback(async (document: Document) => {
        setLoading(true);
        await crud.deleteAsync(document.id.toString());
        setDocuments(current => {
            const newDocuments = [...current.filter(p => p.id !== document.id)];
            return newDocuments;
        });
        setLoading(false);
        setAlertTextContent(`${document.title} foi removido(a) com sucesso!`);
    }, [setDocuments]);

    return (
        <documentContext.Provider
            value={{
                documents,
                loading,
                alertTextContent,
                setAlertTextContent,
                addDocument,
                deleteDocument
            }}
        >
            {children}
        </documentContext.Provider>
    );
}

export function useDocumentContext() {
    return useContext(documentContext);
}
