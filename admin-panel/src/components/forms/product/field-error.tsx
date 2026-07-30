interface FieldErrorProps {
    message?: string;
}

export function FieldError({ message }: FieldErrorProps) {
    if (!message) return null;

    return (
        <p className="mt-1 text-sm font-medium text-destructive">
            {message}
        </p>
    );
}