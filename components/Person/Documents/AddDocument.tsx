import { CustomButton } from "@/components/ui/CustomButton";
import { useControlModalByUrl } from "@/hooks/useControlModalByUrl";
import { AddDocumentModal } from "./AddDocumentModal";

export function AddDocument() {
    const {
        isModalOpen,
        openModal: openAddDocument,
        closeModal: closeAddDocument
    } = useControlModalByUrl({
        modalName: 'add-document'
    });

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
                        onClose={closeAddDocument}
                    />
                )
            }

        </>
    )
}
