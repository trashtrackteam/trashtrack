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

function OnSubmitModal({
    isOpen,
    setIsOpen,
    values,
    image,
}: {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    values: z.infer<typeof formSchema>;
    image: File | undefined;
}) {
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="min-w-full container">
                <AlertDialogHeader>Laporan Form</AlertDialogHeader>
                <AlertDialogDescription className="text-xs">
                    <pre style={{ textWrap: "wrap" }}>{JSON.stringify(values.gambarFile)}</pre>
                    <pre style={{ textWrap: "wrap" }}>{image?.name}</pre>
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
    const [values, setValues] = useState<z.infer<typeof formSchema>>({
        deskripsi: "",
        gambarFile: "",
    });

    const history = useHistory();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            deskripsi: "",
            gambarFile: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        setValues(values);
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
                                    <Input readOnly type="text" {...field} />
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
            <OnSubmitModal isOpen={isOpen} setIsOpen={setIsOpen} values={values} image={pickedImage && pickedImage} />
        </Form>
    );
}
