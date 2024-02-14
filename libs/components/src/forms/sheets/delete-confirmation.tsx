import { API_URL } from "@trashtrack/utils";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
} from "../../ui/alert-dialog";
import { Button } from "../../ui/button";
import { useMutation } from "@tanstack/react-query";

export function UserDeleteConfirmationDialog({
    id,
    refetchUser,
    isOpen,
    setIsOpen,
}: {
    id: string;
    refetchUser: () => void;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}) {
    const {
        mutateAsync,
        isPending,
        isError,
        isSuccess,
        reset: resetMutation,
    } = useMutation({
        mutationKey: ["deleteUser"],
        mutationFn: (formData: { id: string }) => {
            return fetch(API_URL + `/user/${id}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                },
            }).then((res) => res.json());
        },
        onSuccess: (dataMutation) => {
            resetMutation();

            refetchUser();
            setIsOpen(false);
        },
    });

    async function handleDeleteUser() {
        await mutateAsync({ id });
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="min-w-full container">
                <AlertDialogHeader className="text-sm text-center">
                    Are you sure you want to delete this user?
                </AlertDialogHeader>
                <AlertDialogDescription className="text-xs text-center">
                    This action cannot be undone.
                </AlertDialogDescription>
                <AlertDialogFooter className="flex flex-col gap-4">
                    <Button onClick={handleDeleteUser} variant="destructive">
                        Delete
                    </Button>
                    {isPending && <p>Loading...</p>}
                    {isError && <p>Error...</p>}
                    {isSuccess && <p>Success...</p>}
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
