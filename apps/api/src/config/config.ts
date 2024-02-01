/**
 * Retrieves the configuration options for the application.
 * @returns An object containing the port number and database URL.
 */
export default (): {
    port: number;
    databaseURL: string;
} => ({
    port: parseInt(process.env.PORT) || 3001,
    databaseURL: process.env.DATABASE_URL,
});
