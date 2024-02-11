"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
// import { useHistory } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { API_URL } from "@trashtrack/utils";

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
} from "../ui/alert-dialog";
import { useHistory } from "react-router-dom";
import { OperatorContext } from "../api/operator-context";
import { useContext, useState } from "react";
export function SubmitModal({
    isOpen,
    setIsOpen,
    onClose,
    isFailed,
    isLoading,
    data,
}: {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    onClose: () => void;
    isFailed: boolean;
    isLoading: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
}) {
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>Login Account</AlertDialogHeader>
                <AlertDialogDescription>Error trying to login. Please try again.</AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

const formSchema = z.object({
    username: z.coerce.string().min(2, {
        message: "Username harus terdiri dari minimal 2 karakter.",
    }),
    password: z.string().min(2, {
        message: "Password harus terdiri dari minimal 2 karakter.",
    }),
});

export function LoginForm() {
    const history = useHistory();
    const { setOperator } = useContext(OperatorContext);
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const { mutateAsync, data, isError, isPending } = useMutation({
        mutationKey: ["comparePassword"],
        mutationFn: (values: { username: string; password: string }) => {
            return fetch(API_URL + `/user/compare-password/${values.username}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({ password: values.password }),
            }).then((res) => res.json());
        },
        onSuccess: (data) => {
            if (data.data === true) {
                setOperator(form.getValues("username"));
                history.push("/operator/dashboard");
            } else {
                setIsOpen(true);
            }
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await mutateAsync({
            username: values.username,
            password: values.password,
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="totallynotaopeator123" {...field} />
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
                                <Input type="password" placeholder="totallynotapassword123" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button className="w-full" type="submit">
                    Lanjutkan
                </Button>
            </form>

            <SubmitModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                onClose={() => setIsOpen(false)}
                isFailed={isError}
                isLoading={isPending}
                data={data}
            />
        </Form>
    );
}
