import { ExternalPathString, Href, useGlobalSearchParams, useNavigation, usePathname, useRouter } from "expo-router";
import { useEffect, useState } from "react";

interface IUseControlModalByUrlProps {
    modalName: string;
}

export function useControlModalByUrl({
    modalName
}: IUseControlModalByUrlProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const navigation = useNavigation();
    const pathname = usePathname();
    const { modal } = useGlobalSearchParams();
    useEffect(() => {
        if (!!modal && modal === modalName) {
            setIsModalOpen(true);
        } else {
            setIsModalOpen(false);
        }
    }, [modal]);

    const buildPathName = (open?: boolean): Href => {
        return { pathname: pathname as ExternalPathString, params: { modal: !!open ? modalName : undefined } };
    }

    const openModal = () => {
        router.push(buildPathName(true));
    };

    const closeModal = () => {
        navigation.goBack();
        router.push(buildPathName());
    };

    return {
        isModalOpen,
        openModal,
        closeModal
    };
}
