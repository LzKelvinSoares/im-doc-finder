import { CustomButton } from "@/components/ui/CustomButton";
import { useState } from "react";
import { AddDocumentModal } from "./AddDocumentModal";

export function AddDocument() {
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
                    />
                )
            }

        </>
    )
}
