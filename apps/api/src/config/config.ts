export default () => ({
    port: parseInt(process.env.PORT) || 3001,
    database: {
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT) || 5432,
        name: process.env.DATABASE_NAME,
    },
});
