import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import path from "path";
import { User } from "./entity/User";
import { Training } from "./entity/Training";
import { Groups } from "./entity/Groups";
import { Exercise } from "./entity/Exercises";
import { Acompanhamento } from "./entity/Acompanhamento";
import { Image } from "./entity/Image";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true, // This will create the tables if they do not exist ONLY IN DEVELOPMENT
    logging: false,
    entities: [User, Training, Groups, Exercise, Acompanhamento, Image],
    migrations: ["src/migration/*.ts"],
    subscribers: [],
})
