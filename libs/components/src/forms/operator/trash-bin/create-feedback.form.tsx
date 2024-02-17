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

const formSchema = z.object({
    title: z.string().min(8, {
        message: "Title must be at least 8 characters long.",
    }),
    description: z.string().min(8, {
        message: "Description must be at least 8 characters long.",
    }),
});

export function CreateFeedbackForm({ reportId }: { reportId: string }) {
    const history = useHistory();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    });

    const { mutateAsync, isPending, isError } = useMutation({
        mutationKey: ["createFeedback"],
        mutationFn: (values: { reportId: number; title: string; description: string }) => {
            return CapacitorHttp.post({
                url: API_URL + `/feedback`,
                data: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => res.data);
        },
        onSuccess: () => {
            history.replace(`/trash-bin/tabs/feedback/${reportId}`);
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        await mutateAsync({
            reportId: Number(reportId),
            title: values.title,
            description: values.description,
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isPending}
                                    type="text"
                                    placeholder="Title of the feedback"
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
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Textarea disabled={isPending} placeholder="Description of the feedback" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-col gap-4">
                    <Button className="w-full" type="submit" disabled={isPending}>
                        Submit Feedback
                    </Button>
                    {isError && (
                        <p className="text-xs text-center">
                            An error occurred while submitting the feedback. Please try again later.
                        </p>
                    )}
                    <Button
                        className="w-full"
                        variant="secondary"
                        onClick={() => history.replace(`/trash-bin/tabs/feedback/${reportId}`)}
                        disabled={isPending}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </Form>
    );
}
