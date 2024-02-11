export function fallbackRender({
    error,
}: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
}) {
    return (
        <div className="pt-24 px-6 text-left">
            <h1 className="text-lg mb-4">Something went wrong.</h1>
            <p className="text-base">
                <pre>{error.message}</pre>
            </p>
        </div>
    );
}
