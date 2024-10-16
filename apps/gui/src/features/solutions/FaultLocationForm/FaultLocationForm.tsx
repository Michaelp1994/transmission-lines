import { Button } from "@repo/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@repo/ui/form";
import { useForm } from "@repo/ui/hooks/use-form";
import { Input } from "@repo/ui/input";
import toast from "@repo/ui/toast";
import {
    defaultSolution,
    type SolutionFormInput,
    solutionFormSchema,
} from "@repo/validators/forms/Solution.schema";
import { useTranslation } from "react-i18next";

import { ButtonsWrapper, StyledForm } from "~/components/StyledForm";
import TowerSelect from "~/features/towers/components/TowerSelect";
import trpc from "~/utils/trpc";

export default function FaultLocationForm() {
    const { data, isLoading, isError } = trpc.solution.hasSolution.useQuery();
    const { t } = useTranslation("faultLocationForm");
    const utils = trpc.useUtils();

    const form = useForm({
        schema: solutionFormSchema,
        values: defaultSolution,
    });
    const solveMutation = trpc.solution.solve.useMutation({
        async onSuccess() {
            toast.success(`Solved`);
            await utils.solution.hasSolution.invalidate();
        },
        onError: () => {
            toast.error("Can't solve");
        },
    });

    function handleValid(values: SolutionFormInput) {
        solveMutation.mutate(values);
    }
    return (
        <Form {...form}>
            <StyledForm
                onReset={() => {
                    form.reset();
                }}
                onSubmit={form.handleSubmit(handleValid)}
            >
                <FormField
                    control={form.control}
                    name="towerId"
                    render={({ field }) => {
                        return (
                            <FormItem>
                                <FormLabel>{t("towerId.label")}</FormLabel>
                                <FormControl>
                                    <TowerSelect {...field} />
                                </FormControl>
                                <FormDescription>
                                    {t("towerId.description")}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        );
                    }}
                />

                <ButtonsWrapper>
                    <Button type="reset" variant="destructive">
                        {t("form:reset")}
                    </Button>
                    <Button type="submit">{t("form:submit")}</Button>
                </ButtonsWrapper>
            </StyledForm>
        </Form>
    );
}
