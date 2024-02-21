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

export function CreateTrashBinForm() {
    const history = useHistory();
    const { t } = useTranslation();

    const formSchema = z.object({
        name: z.string().min(4, {
            message: t("operator.trashbin.createTrashbin.validation.name"),
        }),
        description: z.string().min(8, {
            message: t("operator.trashbin.createTrashbin.validation.description"),
        }),
        latitude: z.coerce
            .number()
            .min(-90, t("operator.trashbin.createTrashbin.validation.latitude.min"))
            .max(90, t("operator.trashbin.createTrashbin.validation.latitude.max")),
        longitude: z.coerce
            .number()
            .min(-180, t("operator.trashbin.createTrashbin.validation.longitude.min"))
            .max(180, t("operator.trashbin.createTrashbin.validation.longitude.max")),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            latitude: 0.0,
            longitude: 0.0,
        },
    });

    const { mutateAsync, isPending, isError } = useMutation({
        mutationKey: ["createTrashbin"],
        mutationFn: (values: { description: string; name: string; latitude: number; longitude: number }) => {
            return CapacitorHttp.post({
                url: API_URL + `/trash-bin`,
                data: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => res.data);
        },
        onSuccess: () => {
            history.replace(`/trash-bin/tabs/trashbin`);
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await mutateAsync({
            name: values.name,
            description: values.description,
            latitude: values.latitude,
            longitude: values.longitude,
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
                            <FormLabel>{t("operator.trashbin.createTrashbin.name")}</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isPending}
                                    type="text"
                                    placeholder={t("operator.trashbin.createTrashbin.name")}
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
                            <FormLabel>{t("operator.trashbin.createTrashbin.description")}</FormLabel>
                            <FormControl>
                                <Textarea
                                    disabled={isPending}
                                    placeholder={t("operator.trashbin.createTrashbin.description")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="latitude"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("operator.trashbin.createTrashbin.latitude")}</FormLabel>
                            <FormControl>
                                <Input type="number" disabled={isPending} placeholder="0.00" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="longitude"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("operator.trashbin.createTrashbin.longitude")}</FormLabel>
                            <FormControl>
                                <Input type="number" disabled={isPending} placeholder="0.00" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-col gap-4">
                    <Button className="w-full" type="submit" disabled={isPending}>
                        {t("operator.trashbin.createTrashbin.submit")}
                    </Button>
                    {isError && (
                        <p className="text-xs text-center">
                            An error occurred while submitting the trashbin. Please try again later.
                        </p>
                    )}
                    <Button
                        className="w-full"
                        variant="secondary"
                        onClick={() => history.replace(`/trash-bin/tabs/trashbin`)}
                        disabled={isPending}
                    >
                        {t("operator.trashbin.createTrashbin.back")}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
