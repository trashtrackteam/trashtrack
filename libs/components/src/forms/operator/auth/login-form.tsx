"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "../../../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../ui/form";
import { Input } from "../../../ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { API_URL } from "@trashtrack/utils";

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
} from "../../../ui/alert-dialog";
import { useHistory } from "react-router-dom";
import { OperatorContext } from "../../../api/operator-context";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

export function ErrorSubmitDialog({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (value: boolean) => void }) {
    const { t } = useTranslation();

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="min-w-full container">
                <AlertDialogHeader className="text-sm text-center">
                    {t("operator.form.login.error.title")}
                </AlertDialogHeader>
                <AlertDialogDescription className="text-xs text-center">
                    {t("operator.form.login.error.description")}
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>{t("operator.form.login.error.cancel")}</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

const formSchema = z.object({
    username: z.coerce.string().min(4, {
        message: "Username harus terdiri dari minimal 4 karakter.",
    }),
    password: z.string().min(4, {
        message: "Password harus terdiri dari minimal 4 karakter.",
    }),
});

export function LoginForm() {
    const history = useHistory();
    const { setOperator, setRole, setId } = useContext(OperatorContext);
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    const { data, refetch } = useQuery({
        queryKey: ["getUserDataLoginForm"],
        queryFn: () => fetch(API_URL + `/user/username/${form.getValues("username")}`).then((res) => res.json()),
        enabled: false,
        staleTime: 5000,
    });

    const { mutateAsync, isPending } = useMutation({
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
        onSuccess: (dataMutation) => {
            if (dataMutation.data === true) {
                setOperator(form.getValues("username"));
                setRole(data.data.role);
                setId(data.data.id.toString());

                history.replace("/operator/tabs/dashboard");
            } else {
                setIsOpen(true);
            }
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setOperator(null);
        setRole(null);
        setId("");

        refetch();
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
                                <Input
                                    disabled={isPending}
                                    type="text"
                                    placeholder="totallynotaopeator123"
                                    {...field}
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
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isPending}
                                    type="password"
                                    placeholder="totallynotapassword123"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-col gap-4">
                    <Button className="w-full" type="submit" disabled={isPending}>
                        {t("operator.form.login.submit")}
                    </Button>
                    <Button
                        className="w-full"
                        variant="secondary"
                        onClick={() => history.replace("/tabs/home")}
                        disabled={isPending}
                    >
                        {t("operator.form.login.back")}
                    </Button>
                </div>
            </form>

            <ErrorSubmitDialog isOpen={isOpen} setIsOpen={setIsOpen} />
        </Form>
    );
}
