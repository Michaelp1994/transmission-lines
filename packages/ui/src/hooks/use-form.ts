import {
    useForm as _useForm,
    type UseFormProps as _UseFormProps,
    type FieldValues,
} from "react-hook-form";
import type { ZodSchema, ZodErrorMap } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface UseFormProps<
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
> extends Omit<_UseFormProps<TFieldValues, TContext>, "resolver"> {
    schema: ZodSchema<TFieldValues>;
    errorMap?: ZodErrorMap;
    values?: NoInfer<TFieldValues>;
}

export function useForm<
    TFieldValues extends FieldValues = FieldValues,
    TContext = any,
    TTransformedValues extends FieldValues | undefined = undefined,
>({ schema, errorMap, ...props }: UseFormProps<TFieldValues, TContext>) {
    return _useForm({
        ...props,
        resolver: zodResolver(schema),
    });
}
