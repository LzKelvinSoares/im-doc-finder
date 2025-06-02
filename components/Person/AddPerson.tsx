import { useState } from "react";
import { CustomButton } from "../ui/CustomButton";
import { AddPersonModal } from "./AddPersonModal";

export function AddPerson() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openAddPerson = () => {
        setIsModalOpen(true);
    };
    return (
        <>
            <CustomButton
                onPress={openAddPerson}
                title="Add Person"
                accessibilityLabel="Open Add Person Modal"
            />
            {
                isModalOpen && (
                    <AddPersonModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                    />
                )
            }

        </>
    )
}