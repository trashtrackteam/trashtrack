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

export const useGetSubTrashBinById = (subtrashBinId: number) => {
    return useQuery({
        queryKey: ["useGetSubTrashBinByIdForm", subtrashBinId],
        queryFn: () =>
            CapacitorHttp.request({
                url: API_URL + `/sub-trash-bin/id/${subtrashBinId}`,
                method: "GET",
            }).then((res) => res.data),
    });
};

interface InterfaceSubTrashbin {
    id: number;
    trashBinId: number;
    name: string;
    maxCapacity: number;
    currentCapacity: number;
}

export function ChangeSubTrashbinForm({ trashBinId, subTrashBinId }: { trashBinId: string; subTrashBinId: string }) {
    const history = useHistory();

    const { t } = useTranslation();

    const formSchema = z.object({
        name: z.string().min(4, {
            message: t("operator.subtrashbin.update_subtrashbin.validation.name"),
        }),
    });

    const { data: reportData, error, isLoading, refetch, isRefetching } = useGetSubTrashBinById(Number(subTrashBinId));
    const subtrashbin = !isLoading ? (reportData.data as InterfaceSubTrashbin) : undefined;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: useMemo(() => {
            return {
                name: "",
            };
        }, []),
    });

    useEffect(() => {
        if (subtrashbin) {
            form.reset({
                name: subtrashbin.name,
            });
        }
    }, [form, subtrashbin]);

    const {
        mutateAsync,
        isPending,
        isError,
        reset: resetMutation,
    } = useMutation({
        mutationKey: ["updateSubTrashbin", subTrashBinId],
        mutationFn: (values: { name: string }) => {
            return CapacitorHttp.put({
                url: API_URL + `/sub-trash-bin/${subTrashBinId}`,
                data: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => res.data);
        },
        onSuccess: () => {
            history.replace(`/trash-bin/tabs/trashbin/subtrashbin/${trashBinId}/details/${subTrashBinId}`);
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        form.reset();
        resetMutation();

        await mutateAsync({
            name: values.name,
        });
    }

    return isLoading || isPending ? (
        <div>Loading...</div>
    ) : isError ? (
        <div>Error: {JSON.stringify(error)}</div>
    ) : (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("operator.subtrashbin.update_subtrashbin.name")}</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isPending}
                                    type="text"
                                    placeholder={t("operator.subtrashbin.update_subtrashbin.name")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-col gap-4">
                    <Button className="w-full" type="submit" disabled={isPending}>
                        {t("operator.subtrashbin.update_subtrashbin.submit")}
                    </Button>
                    {isError && (
                        <p className="text-xs text-center">
                            An error occurred while submitting the sub trashbin. Please try again later.
                        </p>
                    )}
                    <Button
                        className="w-full"
                        variant="secondary"
                        onClick={() =>
                            history.replace(
                                `/trash-bin/tabs/trashbin/subtrashbin/${trashBinId}/details/${subTrashBinId}`
                            )
                        }
                        disabled={isPending}
                    >
                        {t("operator.subtrashbin.update_subtrashbin.back")}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
