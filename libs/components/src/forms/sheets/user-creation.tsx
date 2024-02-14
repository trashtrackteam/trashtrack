import {
    Button,
    Input,
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Checkbox,
} from "../../index";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { API_URL } from "@trashtrack/utils";

enum Role {
    operator = "operator",
    admin = "admin",
}

const formSchema = z.object({
    name: z.string().min(4, {
        message: "Nama harus terdiri dari minimal 4 karakter.",
    }),
    username: z.coerce.string().min(4, {
        message: "Username harus terdiri dari minimal 8 karakter.",
    }),
    password: z.string().min(4, {
        message: "Password harus terdiri dari minimal 4 karakter.",
    }),
    phoneNumber: z.string().min(4, {
        message: "Nomor telepon harus terdiri dari minimal 4 karakter.",
    }),
    role: z.nativeEnum(Role).refine((value) => value !== null, {
        message: "Role is required.",
    }),
    active: z.boolean().refine((value) => value !== null, {
        message: "Active is required.",
    }),
    description: z.string().optional(),
});

export function UserCreationSheet({
    refetchUser,
    isOpen,
    setIsOpen,
}: {
    refetchUser: () => void;
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            active: true,
            username: "",
            password: "",
            phoneNumber: "",
            role: Role.operator,
            description: "",
        },
    });

    const {
        mutateAsync,
        isPending,
        isError,
        isSuccess,
        reset: resetMutation,
    } = useMutation({
        mutationKey: ["comparePassword"],
        mutationFn: (formData: {
            name?: string;
            username?: string;
            password?: string;
            phoneNumber?: string;
            role?: Role;
            active?: boolean;
            description?: string;
        }) => {
            return fetch(API_URL + `/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(formData),
            }).then((res) => res.json());
        },
        onSuccess: (dataMutation) => {
            form.reset();
            resetMutation();

            refetchUser();
            setIsOpen(false);
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await mutateAsync({
            name: values.name,
            username: values.username.toLowerCase(),
            password: values.password,
            phoneNumber: values.phoneNumber,
            role: values.role,
            active: values.active,
            description: values.description,
        });
    }

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent className="w-full overflow-y-scroll max-h-screen">
                <SheetHeader className="mb-4">
                    <SheetTitle>Create a new user</SheetTitle>
                    <SheetDescription>Fill in the details to create a new user.</SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isPending}
                                            type="text"
                                            placeholder="Nicholas D. Miller"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} type="text" placeholder="illenium" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input disabled={isPending} type="password" placeholder="illenium" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isPending}
                                            type="number"
                                            placeholder="081234567890"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="operator">Operator</SelectItem>
                                            <SelectItem value="admin">Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="active"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="mr-4">Active?</FormLabel>
                                    <FormControl className="border-4 border-black">
                                        <Checkbox
                                            className="border-4 border-black"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isPending}
                                            type="text"
                                            placeholder="A user that is very active in the community."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex flex-col gap-4">
                            <Button className="w-full" type="submit" disabled={isPending}>
                                {isPending ? "Creating user..." : "Create User"}
                            </Button>
                            {isSuccess && (
                                <div className="text-green-500 text-sm text-center">User created successfully.</div>
                            )}
                            {isError && (
                                <div className="text-red-500 text-sm text-center">
                                    There was an error creating the user. Please try again.
                                </div>
                            )}
                        </div>
                    </form>
                </Form>

                <SheetFooter>
                    <SheetClose className="mt-4" asChild>
                        <Button variant="secondary" type="button">
                            Close
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
