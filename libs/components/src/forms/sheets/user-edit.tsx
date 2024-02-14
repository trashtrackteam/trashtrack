export function UserEditSheet({
    id,
    refetchUser,
    isOpen,
    setIsOpen,
}: {
    id: string;
    refetchUser: () => void;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}) {}
