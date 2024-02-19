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
import { useTranslation } from "react-i18next";

export function CreateSubTrashBinForm({ trashBinId }: { trashBinId: string }) {
    const history = useHistory();
    const { t } = useTranslation();

    const formSchema = z.object({
        name: z.string().min(4, {
            message: t("operator.subtrashbin.create_subtrashbin.validation.name"),
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const { mutateAsync, isPending, isError } = useMutation({
        mutationKey: ["createSubTrashbin"],
        mutationFn: (values: { name: string; trashBinId: number }) => {
            return CapacitorHttp.post({
                url: API_URL + `/sub-trash-bin`,
                data: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => res.data);
        },
        onSuccess: () => {
            history.replace(`/trash-bin/tabs/trashbin/subtrashbin/${trashBinId}`);
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await mutateAsync({
            name: values.name,
            trashBinId: Number(trashBinId),
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
                            <FormLabel>{t("operator.subtrashbin.create_subtrashbin.name")}</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isPending}
                                    type="text"
                                    placeholder={t("operator.subtrashbin.create_subtrashbin.name")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-col gap-4">
                    <Button className="w-full" type="submit" disabled={isPending}>
                        {t("operator.subtrashbin.create_subtrashbin.submit")}
                    </Button>
                    {isError && (
                        <p className="text-xs text-center">
                            An error occurred while submitting the sub trashbin. Please try again later.
                        </p>
                    )}
                    <Button
                        className="w-full"
                        variant="secondary"
                        onClick={() => history.replace(`/trash-bin/tabs/trashbin/subtrashbin/${trashBinId}`)}
                        disabled={isPending}
                    >
                        {t("operator.subtrashbin.create_subtrashbin.back")}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
