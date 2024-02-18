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

export const useGetTrashBinById = (trashBinId: number) => {
    return useQuery({
        queryKey: ["useGetTrashBinByIdForm", trashBinId],
        queryFn: () =>
            CapacitorHttp.request({
                url: API_URL + `/trash-bin/id/${trashBinId}`,
                method: "GET",
            }).then((res) => res.data),
    });
};

const formSchema = z.object({
    name: z.string().min(4, {
        message: "Name must be at least 4 characters long.",
    }),
    description: z.string().min(8, {
        message: "Description CreateTrashBinFormmust be at least 8 characters long.",
    }),
    latitude: z.coerce.number().min(-90, "Latitude must be at least -90.").max(90, "Latitude must be at most 90."),
    longitude: z.coerce
        .number()
        .min(-180, "Longitude must be at least -180.")
        .max(180, "Longitude must be at most 180."),
});

interface InterfaceTrashbin {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    description: string;
    openCount: number;
    createdAt: string;
    updatedAt: string;
}

export function ChangeTrashbinForm({ trashBinId }: { trashBinId: string }) {
    const history = useHistory();

    const { data: reportData, error, isLoading, refetch, isRefetching } = useGetTrashBinById(Number(trashBinId));
    const trashbin = !isLoading ? (reportData.data as InterfaceTrashbin) : undefined;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: useMemo(() => {
            return {
                name: "",
                description: "",
                openCount: 0,
                latitude: 0.0,
                longitude: 0.0,
            };
        }, []),
    });

    useEffect(() => {
        if (trashbin) {
            form.reset({
                name: trashbin.name,
                description: trashbin.description,
                latitude: trashbin.latitude,
                longitude: trashbin.longitude,
            });
        }
    }, [form, trashbin]);

    const {
        mutateAsync,
        isPending,
        isError,
        reset: resetMutation,
    } = useMutation({
        mutationKey: ["updateTrashbin", trashBinId],
        mutationFn: (values: { description: string; name: string; latitude: number; longitude: number }) => {
            return CapacitorHttp.put({
                url: API_URL + `/trash-bin/${trashBinId}`,
                data: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => res.data);
        },
        onSuccess: () => {
            history.replace(`/trash-bin/tabs/trashbin/details/${trashBinId}`);
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        form.reset();
        resetMutation();

        await mutateAsync({
            name: values.name,
            description: values.description,
            latitude: values.latitude,
            longitude: values.longitude,
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
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input disabled={isPending} type="text" placeholder="Name of the trashbin" {...field} />
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
                                <Textarea disabled={isPending} placeholder="Description of the trashbin" {...field} />
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
                            <FormLabel>Latitude</FormLabel>
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
                            <FormLabel>Longitude</FormLabel>
                            <FormControl>
                                <Input type="number" disabled={isPending} placeholder="0.00" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-col gap-4">
                    <Button className="w-full" type="submit" disabled={isPending}>
                        Update Trashbin
                    </Button>
                    {isError && (
                        <p className="text-xs text-center">
                            An error occurred while submitting the trashbin. Please try again later.
                        </p>
                    )}
                    <Button
                        className="w-full"
                        variant="secondary"
                        onClick={() => history.replace(`/trash-bin/tabs/trashbin/details/${trashBinId}`)}
                        disabled={isPending}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </Form>
    );
}
