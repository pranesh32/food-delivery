
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

export const connectionStr = `mongodb+srv://${username}:${password}@cluster0.6csjh.mongodb.net/restodb?retryWrites=true&w=majority&appName=Cluster0`;


