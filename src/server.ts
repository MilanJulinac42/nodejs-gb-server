import express from "express";
import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Logging";
import authorRoutes from "./routes/Author";
import basketItemRoutes from "./routes/BasketItem";
import basketTypeRoutes from "./routes/BasketType";

const router = express();

// Connect to MongoDB
mongoose.connect(config.mongo.url, config.mongo.options)
	.then(() => {
		Logging.info(`Connected to MongoDB.`);
		StartServer();
	})
	.catch((error) => {
		Logging.error("Failed to connect");
		Logging.error(error);
	});

const StartServer = () => {
	router.use((req, res, next) => {
		Logging.info(`Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

		res.on("finish", () => {
			Logging.info(`Incoming -> Method: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status [${res.statusCode}]`);
		});

		next();
	});

	router.use(express.urlencoded({ extended: true }));
	router.use(express.json());

	// Rules of API
	router.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

		if (req.method == "OPTIONS") {
			res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
			return res.status(200).json({});
		}

		next();
	});

	// Routes
	router.use("/authors", authorRoutes);
	router.use("/basket-item", basketItemRoutes);
	router.use("/basket-type", basketTypeRoutes);

	// Healthcheck
	router.get("/ping", (req, res, next) => res.status(200).json({ message: "ping" }));

	// Error handling
	router.use((req, res, next) => {
		const error = new Error("not-found");
		Logging.error(error);

		return res.status(404).json({ message: error.message });
	});

	http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}.`));
};
