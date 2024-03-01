import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { API_URL } from "@trashtrack/utils";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../ui/form";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Textarea } from "../../../ui/textarea";

import { CapacitorHttp } from "@capacitor/core";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select";

export interface InterfaceChangePassword {
    newPassword: string;
    confirmPassword: string;
    oldPassword: string;
}

export function ChangePasswordForm({ userId }: { userId: string }) {
    const history = useHistory();
    const { t } = useTranslation();

    const formSchema = z.object({
        old_password: z.string().min(4, {
            message: t("operator.user.change_password.validation.name"),
        }),
        confirm_password: z.string().min(4, {
            message: t("operator.user.change_password.validation.username"),
        }),
        new_password: z.string().min(8, {
            message: t("operator.user.change_password.validation.phoneNumber"),
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: useMemo(() => {
            return {
                old_password: "",
                confirm_password: "",
                new_password: "",
            };
        }, []),
    });

    const {
        mutateAsync,
        isPending,
        isError,
        error,
        reset: resetMutation,
    } = useMutation({
        mutationKey: ["updatePassword", userId],
        mutationFn: (values: { oldPassword: string; confirmPassword: string; newPassword: string }) => {
            return CapacitorHttp.put({
                url: API_URL + `/user/${userId}/password`,
                data: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => res.data);
        },
        onSuccess: () => {
            history.replace(`/operator/tabs/user/details/${userId}`);
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        form.reset();
        resetMutation();

        await mutateAsync({
            oldPassword: values.old_password,
            confirmPassword: values.confirm_password,
            newPassword: values.new_password,
        });
    }

    return isPending ? (
        <div>Loading...</div>
    ) : isError ? (
        <div>Error: {JSON.stringify(error)}</div>
    ) : (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="old_password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("operator.user.change_password.oldPassword")}</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isPending}
                                    type="password"
                                    placeholder={t("operator.user.change_password.oldPassword")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="new_password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("operator.user.change_password.newPassword")}</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isPending}
                                    type="password"
                                    placeholder={t("operator.user.change_password.newPassword")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="confirm_password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("operator.user.change_password.confirmPassword")}</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isPending}
                                    type="password"
                                    placeholder={t("operator.user.change_password.confirmPassword")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-col gap-4">
                    <Button className="w-full" type="submit" disabled={isPending}>
                        {t("operator.user.change_password.submit")}
                    </Button>
                    {isError && (
                        <p className="text-xs text-center">
                            An error occurred while submitting the trashbin. Please try again later.
                        </p>
                    )}
                    <Button
                        className="w-full"
                        variant="secondary"
                        onClick={() => history.replace(`/operator/tabs/user/details/${userId}`)}
                        disabled={isPending}
                    >
                        {t("operator.trashbin.change_trashbin.back")}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
