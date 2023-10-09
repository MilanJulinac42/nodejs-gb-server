import dontenv from "dotenv";
import { W } from "mongodb";

dontenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME || "";
const MONGO_DATABASE = process.env.MONGO_DATABASE || "";

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverSelectionTimeoutMS: 5000,
	socketTimeoutMS: 45000,
	family: 4,
	retryWrites: true,
	w: "majority" as W | undefined
};

const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DATABASE}?`;

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 1337;

export const config = {
	mongo: {
		url: MONGO_URL,
		options: options
	},
	server: {
		port: SERVER_PORT
	}
};
