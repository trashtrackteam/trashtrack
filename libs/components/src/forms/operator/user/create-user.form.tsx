import { CapacitorHttp } from "@capacitor/core";
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
import { useTranslation } from "react-i18next";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../ui/select";

export function CreateUserForm() {
    const history = useHistory();
    const { t } = useTranslation();

    const formSchema = z.object({
        name: z.string().min(4, {
            message: t("operator.user.create_user.validation.name"),
        }),
        username: z.string().min(4, {
            message: t("operator.user.create_user.validation.username"),
        }),
        password: z.string().min(8, {
            message: t("operator.user.create_user.validation.password"),
        }),
        phoneNumber: z.string().min(8, {
            message: t("operator.user.create_user.validation.phoneNumber"),
        }),
        role: z.enum(["admin", "operator"]),
        active: z.enum(["true", "false"]),
        description: z.string().min(8, {
            message: t("operator.user.create_user.validation.description"),
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            username: "",
            password: "",
            phoneNumber: "",
            role: "operator",
            active: "false",
            description: "",
        },
    });

    const { mutateAsync, isPending, isError } = useMutation({
        mutationKey: ["createUser"],
        mutationFn: (values: {
            name: string;
            username: string;
            password: string;
            phoneNumber: string;
            role: "admin" | "operator";
            active: boolean;
            description: string;
        }) => {
            return CapacitorHttp.post({
                url: API_URL + `/user`,
                data: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => res.data);
        },
        onSuccess: () => {
            history.replace(`/operator/tabs/user`);
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values.active);
        await mutateAsync({
            name: values.name,
            username: values.username,
            password: values.password,
            phoneNumber: values.phoneNumber,
            role: values.role,
            active: Boolean(values.active === "true"),
            description: values.description,
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("operator.user.create_user.name")}</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isPending}
                                    type="text"
                                    placeholder={t("operator.user.create_user.name")}
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
                            <FormLabel>{t("operator.user.create_user.username")}</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isPending}
                                    type="text"
                                    placeholder={t("operator.user.create_user.username")}
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
                            <FormLabel>{t("operator.user.create_user.password")}</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isPending}
                                    type="password"
                                    placeholder={t("operator.user.create_user.password")}
                                    {...field}
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
                            <FormLabel>{t("operator.user.create_user.phoneNumber")}</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isPending}
                                    type="number"
                                    placeholder={t("operator.user.create_user.phoneNumber")}
                                    {...field}
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
                            <FormLabel>{t("operator.user.create_user.description")}</FormLabel>
                            <FormControl>
                                <Textarea
                                    disabled={isPending}
                                    placeholder={t("operator.user.create_user.description")}
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
                            <FormLabel>{t("operator.user.create_user.role")}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t("operator.user.create_user.role_select")} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="admin">Admin</SelectItem>
                                    <SelectItem value="operator">Operator</SelectItem>
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
                            <FormLabel>{t("operator.user.create_user.active")}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t("operator.user.create_user.role_select")} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="true">Aktif</SelectItem>
                                    <SelectItem value="false">Tidak Aktif</SelectItem>
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-col gap-4">
                    <Button className="w-full" type="submit" disabled={isPending}>
                        {t("operator.user.create_user.submit")}
                    </Button>
                    {isError && (
                        <p className="text-xs text-center">
                            An error occurred while submitting the user. Please try again later.
                        </p>
                    )}
                    <Button
                        className="w-full"
                        variant="secondary"
                        onClick={() => history.replace(`/operator/tabs/user`)}
                        disabled={isPending}
                    >
                        {t("operator.user.create_user.back")}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
