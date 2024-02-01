"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../ui/alert-dialog";
import { Input } from "../ui/input";
import { useHistory } from "react-router-dom";
import { useState } from "react";

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

const DialogOnSubmit = ({ isOpen }: { isOpen: boolean }) => {
    const history = useHistory();

    return (
        <AlertDialog open={isOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Lorem ipsum!</AlertDialogTitle>
                    <AlertDialogDescription>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi veniam nemo voluptatibus totam
                        laudantium. Aliquam non ullam suscipit.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => history.replace("/complain/dashboard")}>
                        Lanjutkan
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export function PersonalDetailsForm() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nik: 0,
            nama_lengkap: "",
            no_telpon_wa: 0,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        setIsDialogOpen(true);
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
                <Button className="w-full" type="submit">
                    Lanjutkan
                </Button>
            </form>

            <DialogOnSubmit isOpen={isDialogOpen} />
        </Form>
    );
}
