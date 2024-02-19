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

export function CreateFeedbackForm({ reportId }: { reportId: string }) {
    const history = useHistory();
    const { t } = useTranslation();

    const formSchema = z.object({
        title: z.string().min(8, {
            message: t("operator.reports.feedback.delete.createFeedback.validation.title"),
        }),
        description: z.string().min(8, {
            message: t("operator.reports.feedback.delete.createFeedback.validation.subtitle"),
        }),
    });

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
                            <FormLabel>{t("operator.reports.feedback.delete.createFeedback.title")}</FormLabel>
                            <FormControl>
                                <Input
                                    disabled={isPending}
                                    type="text"
                                    placeholder={t("operator.reports.feedback.delete.createFeedback.title")}
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
                            <FormLabel>{t("operator.reports.feedback.delete.createFeedback.description")}</FormLabel>
                            <FormControl>
                                <Textarea
                                    disabled={isPending}
                                    placeholder={t("operator.reports.feedback.delete.createFeedback.description")}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-col gap-4">
                    <Button className="w-full" type="submit" disabled={isPending}>
                        {t("operator.reports.feedback.delete.createFeedback.submit")}
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
                        {t("operator.reports.feedback.delete.createFeedback.cancel")}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
