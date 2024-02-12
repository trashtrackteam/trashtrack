"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useHistory } from "react-router-dom";
import { setUserNIK } from "@trashtrack/utils";

const formSchema = z.object({
    nik: z.coerce.number().min(16, {
        message: "NIK harus terdiri dari 16 digit.",
    }),
    nama_lengkap: z.string().min(3, {
        message: "Nama lengkap harus terdiri dari minimal 3 karakter.",
    }),
    no_telpon_wa: z.coerce.number().min(10, {
        message: "Nomor telepon harus terdiri dari minimal 10 karakter.",
    }),
});

export function PersonalDetailsForm() {
    const history = useHistory();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nik: 0,
            nama_lengkap: "",
            no_telpon_wa: 0,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        setUserNIK(values.nik);
        history.replace("/complain/dashboard");
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="nik"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>NIK</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="3602041211870001" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="nama_lengkap"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nama Lengkap</FormLabel>
                            <FormControl>
                                <Input placeholder="Martin Agustinus Gerrix" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="no_telpon_wa"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nomor Telepon/WhatsApp</FormLabel>
                            <FormControl>
                                <Input type="number" placeholder="0000000000" {...field} />
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
        </Form>
    );
}
