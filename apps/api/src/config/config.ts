export default () => ({
    port: parseInt(process.env.PORT) || 3001,
    databaseURL: process.env.DATABASE_URL,
});
