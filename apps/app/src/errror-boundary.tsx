export function fallbackRender({
    error,
}: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
}) {
    return (
        <div className="pt-24 px-6 text-left">
            <div className="container">
                <h1 className="text-lg mb-4">Something went wrong.</h1>
                <p className="text-xs">
                    <pre style={{ textWrap: "balance" }}>{error.message}</pre>
                </p>
            </div>
        </div>
    );
}
