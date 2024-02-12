/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../ui/form";
import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
} from "../../../ui/alert-dialog";
import { pickImage } from "./pick-image";
import { Textarea } from "../../../ui/textarea";
import { API_URL } from "@trashtrack/utils";
import { useMutation } from "@tanstack/react-query";

import { CapacitorHttp } from "@capacitor/core";

function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function OnSubmitModal({
    isOpen,
    setIsOpen,
    isError,
    error,
    isPending,
    isSuccess,
    image,
}: {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    isError?: boolean;
    error: Error | null;
    isPending?: boolean;
    isSuccess?: boolean;
    image: File | undefined;
}) {
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="min-w-full container">
                <AlertDialogHeader>Laporan Form</AlertDialogHeader>
                <AlertDialogDescription className="text-xs">
                    {isPending && "Sedang mengirim laporan..."}
                    {isError && (
                        <>
                            Gagal mengirim laporan.
                            <br />
                            {error?.name} - {error?.message}
                            <br />
                            {error?.stack}
                        </>
                    )}
                    {isSuccess && "Laporan berhasil dikirim."}
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

const formSchema = z.object({
    deskripsi: z.string().min(16, {
        message: "Deskripsi laporan harus terdiri dari minimal 16 karakter.",
    }),
    gambarFile: z.string().min(4, {
        message: "Gambar harus diisi.",
    }),
});

export function ComplainLaporanForm({ tempah_sampah_id }: { tempah_sampah_id: string }) {
    const [pickedImage, setPickedImage] = useState<File>();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const history = useHistory();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            deskripsi: "",
            gambarFile: "",
        },
    });

    const { mutateAsync, isError, isPending, isSuccess, error } = useMutation({
        mutationKey: ["postReport"],
        mutationFn: (formData: FormData) => {
            return CapacitorHttp.post({
                url: API_URL + `/report`,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                },
                data: JSON.parse(JSON.stringify(Object.fromEntries(formData.entries()))),
            }).then((res) => res.data);
        },
        onError: (error) => {
            setIsOpen(true);
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const file = await fileToBase64(pickedImage as File);

        const formData = new FormData();

        formData.append("trashBinId", tempah_sampah_id);
        formData.append("nik", "3602041211870001");
        formData.append("name", "Yehezkiel Dio Sinolungan");
        formData.append("description", values.deskripsi);
        formData.append("phoneNumber", "081234567890");
        formData.append("image", file);

        await mutateAsync(formData);
        setIsOpen(true);
    }

    const handlePickImage = async () => {
        const image = await pickImage();

        if (image) {
            const currentDateTime = new Date().toISOString().replace(/[-:.]/g, "");
            const fileName = `image_${currentDateTime}.jpg`;
            const file = new File([image], fileName, { type: "image/jpeg" });

            setPickedImage(file);
            form.setValue("gambarFile", file.name);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="deskripsi"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Laporan</FormLabel>
                            <FormControl>
                                <Textarea placeholder="Deskripsi laporan" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="gambarFile"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Foto</FormLabel>
                            <FormControl>
                                <>
                                    <Button type="button" className="w-full" onClick={handlePickImage}>
                                        Ambil Foto
                                    </Button>
                                    {pickedImage && (
                                        <img
                                            src={URL.createObjectURL(pickedImage)}
                                            alt="Picked"
                                            className="w-full h- object-cover"
                                        />
                                    )}
                                    <Input type="text" {...field} />
                                </>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-col gap-4">
                    <Button className="w-full" type="submit">
                        Lanjutkan
                    </Button>
                    <Button className="w-full" variant="secondary" onClick={() => history.replace("/tabs/home")}>
                        Kembali
                    </Button>
                </div>
            </form>
            <OnSubmitModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                isError={isError}
                error={error}
                isPending={isPending}
                isSuccess={isSuccess}
                image={pickedImage && pickedImage}
            />
        </Form>
    );
}
