import { useControlModalByUrl } from "@/hooks/useControlModalByUrl";
import { CustomButton } from "../ui/CustomButton";
import { AddPersonModal } from "./AddPersonModal";

export function AddPerson() {
    const {
        isModalOpen,
        openModal: openAddPerson,
        closeModal: closeAddPerson
    } = useControlModalByUrl({
        modalName: 'add-person'
    });

    return (
        <>
            <CustomButton
                onPress={openAddPerson}
                title="Adicionar Pessoa"
                accessibilityLabel="Open Add Person Modal"
            />
            {
                isModalOpen && (
                    <AddPersonModal
                        isOpen={isModalOpen}
                        onClose={closeAddPerson}
                    />
                )
            }

        </>
    )
}