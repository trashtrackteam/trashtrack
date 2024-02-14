import { useQuery } from "@tanstack/react-query";
import {
    Input,
    Label,
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetFooter,
    SheetClose,
    Button,
} from "../../index";
import { API_URL } from "@trashtrack/utils";

export function UserDetailsShet({
    id,
    isOpen,
    setIsOpen,
}: {
    id: string;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}) {
    const { data, isLoading } = useQuery({
        queryKey: ["getUser"],
        queryFn: () => fetch(API_URL + `/user/id/${id}`).then((res) => res.json()),
    });

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent className="w-full overflow-y-scroll max-h-screen">
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        <SheetHeader className="mb-4">
                            <SheetTitle>User Details</SheetTitle>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input readOnly id="name" value={data.data.name} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Username
                                </Label>
                                <Input readOnly id="username" value={data.data.username} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phoneNumber" className="text-right">
                                    Phone Number
                                </Label>
                                <Input readOnly id="phoneNumber" value={data.data.phoneNumber} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="role" className="text-right">
                                    Role
                                </Label>
                                <Input readOnly id="role" value={data.data.role} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="active" className="text-right">
                                    Is Active
                                </Label>
                                <Input
                                    readOnly
                                    id="active"
                                    value={data.data.active ? "Yes" : "No"}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">
                                    Description
                                </Label>
                                <Input
                                    readOnly
                                    id="description"
                                    value={data.data.description || "No description"}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <SheetFooter>
                            <SheetClose className="mt-4" asChild>
                                <Button variant="secondary" type="button">
                                    Close
                                </Button>
                            </SheetClose>
                        </SheetFooter>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
