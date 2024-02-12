"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";

import { Button } from "../../../ui/button";
import { Form } from "../../../ui/form";
import { pickImage } from "./pick-image";

const formSchema = z.object({});

export function ComplainLaporanForm() {
    const [pickedImage, setPickedImage] = useState<File>();
    const history = useHistory();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {},
    });

    function onSubmit(values: z.infer<typeof formSchema>) {}

    const handlePickImage = async () => {
        const image = await pickImage();

        if (image) {
            // setPickedImage(image);
            const file = new File([image], "image.jpg", { type: "image/jpeg" });
            setPickedImage(file);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="flex flex-col gap-4">
                    <Button className="w-full" onClick={handlePickImage}>
                        Ambil Foto
                    </Button>
                    {pickedImage && (
                        <>
                            <img
                                src={URL.createObjectURL(pickedImage)}
                                alt="Picked"
                                className="w-full h-64 object-cover"
                            />
                            {/* <img src={pickedImage} alt="Picked" className="w-full h-64 object-cover" /> */}
                            <br />
                            <pre>
                                <code>{JSON.stringify(pickedImage, null, 2)}</code>
                            </pre>
                        </>
                    )}
                </div>
                <div className="flex flex-col gap-4">
                    <Button className="w-full" type="submit">
                        Lanjutkan
                    </Button>
                    <Button className="w-full" variant="secondary" onClick={() => history.replace("/tabs/home")}>
                        Kembali
                    </Button>
                </div>
            </form>
        </Form>
    );
}
