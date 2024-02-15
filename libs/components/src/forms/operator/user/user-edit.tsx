import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { API_URL } from "@trashtrack/utils";
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Checkbox } from "../../../index";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../ui/form";
import { useMemo, useState } from "react";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
} from "../../../ui/alert-dialog";
import { useHistory } from "react-router-dom";

enum Role {
    operator = "operator",
    admin = "admin",
}

interface User {
    id: number;
    name: string;
    username: string;
    password: string;
    phoneNumber: string;
    role: Role;
    active: boolean;
    description: string;
}

const formSchema = z.object({
    name: z.string().optional().nullable(),
    username: z.coerce.string().optional().nullable(),
    password: z.string().optional(),
    phoneNumber: z.string().optional().nullable(),
    role: z
        .nativeEnum(Role)
        .refine((value) => value !== null, {
            message: "Role is required.",
        })
        .optional()
        .nullable(),
    active: z
        .boolean()
        .refine((value) => value !== null, {
            message: "Active is required.",
        })
        .optional()
        .nullable(),
    description: z.string().nullable().optional(),
});

const formPasswordSchema = z.object({
    oldPassword: z.string().min(8, {
        message: "Password harus terdiri dari minimal 8 karakter.",
    }),
    newPassword: z.string().min(8, {
        message: "Password harus terdiri dari minimal 8 karakter.",
    }),
    confirmPassword: z.string().min(8, {
        message: "Password harus terdiri dari minimal 8 karakter.",
    }),
});

export function UserUpdatePasswordDialog({
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
    const history = useHistory();

    const form = useForm<z.infer<typeof formPasswordSchema>>({
        resolver: zodResolver(formPasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
    });

    const {
        mutateAsync,
        isPending,
        isError,
        isSuccess,
        reset: resetMutation,
    } = useMutation({
        mutationKey: ["updateUser"],
        mutationFn: (formData: { id: string; oldPassword: string; newPassword: string; confirmPassword: string }) => {
            return fetch(API_URL + `/user/${id}/password`, {
                method: "PUT",
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
            history.replace("/operator/tabs/user");
        },
    });

    async function onSubmit(values: z.infer<typeof formPasswordSchema>) {
        await mutateAsync({
            id: id,
            oldPassword: values.oldPassword,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
        });
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="min-w-full container">
                <AlertDialogHeader className="text-sm text-center">Update password</AlertDialogHeader>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="oldPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Old Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={false}
                                                type="password"
                                                onChange={(e) => field.onChange(e.target.value)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={false}
                                                type="password"
                                                onChange={(e) => field.onChange(e.target.value)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled={false}
                                                type="password"
                                                onChange={(e) => field.onChange(e.target.value)}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-col gap-4">
                                <Button className="w-full" type="submit">
                                    {isPending ? "Updating password..." : "Update Password"}
                                </Button>
                                {isSuccess && (
                                    <div className="text-green-500 text-sm text-center">
                                        Password updated successfully.
                                    </div>
                                )}
                                {isError && (
                                    <div className="text-red-500 text-sm text-center">
                                        There was an error updating the password. Please try again.
                                    </div>
                                )}
                            </div>
                        </form>
                    </Form>
                </div>

                <AlertDialogFooter className="flex flex-col gap-4">
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export function UserEditForm({ id, refetch, user }: { id: string; refetch: () => void; user: User }) {
    const [isUpdatePasswordDialogOpen, setIsUpdatePasswordDialogOpen] = useState(false);
    const history = useHistory();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: useMemo(() => {
            return {
                name: "",
                username: "",
                password: "",
                phoneNumber: "",
                role: Role.operator,
                active: false,
                description: "",
            };
        }, []),
    });

    // useEffect(() => {
    //     form.reset(user);
    // }, [form, user]);

    const {
        mutateAsync,
        isPending,
        isError,
        isSuccess,
        reset: resetMutation,
    } = useMutation({
        mutationKey: ["updateUser"],
        mutationFn: (formData: {
            name?: string;
            username?: string;
            password?: string;
            phoneNumber?: string;
            role?: Role;
            active?: boolean;
            description?: string;
        }) => {
            return fetch(API_URL + `/user/${user.id}`, {
                method: "PUT",
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
            refetch();
            history.replace("/operator/tabs/user");
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = {
            name: values.name || undefined,
            username: values.username ? values.username.toLowerCase() : undefined,
            password: values.password || undefined,
            phoneNumber: values.phoneNumber || undefined,
            role: values.role || undefined,
            active: values.active || undefined,
            description: values.description || undefined,
        };

        await mutateAsync(formData);
    }

    return (
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
                                    value={field.value ?? ""}
                                    onChange={(e) => field.onChange(e.target.value)}
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
                                <Input
                                    disabled={isPending}
                                    value={field.value ?? ""}
                                    type="text"
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem className="hidden" hidden>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    value={field.value ?? ""}
                                    hidden
                                    className="hidden"
                                    disabled={isPending}
                                    type="password"
                                    onChange={(e) => field.onChange(e.target.value)}
                                />
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
                                    value={field.value ?? ""}
                                    disabled={isPending}
                                    type="text"
                                    onChange={(e) => field.onChange(e.target.value)}
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
                            <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
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
                                    checked={field.value ?? false}
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
                                    value={field.value ?? ""}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    // onChange={(e) => field.onChange(e.target.value)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-col gap-4">
                    <Button
                        variant="secondary"
                        className="w-full"
                        type="button"
                        disabled={isPending}
                        onClick={() => setIsUpdatePasswordDialogOpen(true)}
                    >
                        Update password
                    </Button>
                    <Button className="w-full" type="submit" disabled={isPending}>
                        {isPending ? "Updating user..." : "Update User"}
                    </Button>
                    {isSuccess && <div className="text-green-500 text-sm text-center">User created successfully.</div>}
                    {isError && (
                        <div className="text-red-500 text-sm text-center">
                            There was an error creating the user. Please try again.
                        </div>
                    )}
                    <Button
                        variant="secondary"
                        className="w-full"
                        type="button"
                        onClick={() => history.replace("/operator/tabs/user")}
                    >
                        Cancel
                    </Button>
                </div>

                <UserUpdatePasswordDialog
                    id={id}
                    refetchUser={refetch}
                    isOpen={isUpdatePasswordDialogOpen}
                    setIsOpen={setIsUpdatePasswordDialogOpen}
                />
            </form>
        </Form>
    );
}
