import { CustomButton } from "@/components/ui/CustomButton";
import { Person } from "@/types";
import { useState } from "react";
import { AddDocumentModal } from "./AddDocumentModal";

interface AddDocumentProps {
    person: Person;
}

export function AddDocument({
    person
}: AddDocumentProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openAddDocument = () => {
        setIsModalOpen(true);
    };
    return (
        <>
            <CustomButton
                onPress={openAddDocument}
                title="Adicionar Documento"
                accessibilityLabel="Open Add Person Modal"
            />
            {
                isModalOpen && (
                    <AddDocumentModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        person={person}
                    />
                )
            }

        </>
    )
}
