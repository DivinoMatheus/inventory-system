import Express from "express";
import Database from "./shared/database";
import decrementInventory from "./decrement-inventory";
import OutOfStockError from "./out-of-stock-error";
import Logger from "./shared/logger";
import Env from "./shared/env";
import { setupDb } from "./setup-db";

Database.create();

const app = Express();

app.post("/inventory", async (req, res) => {
  try {
    await decrementInventory();
    return res.status(201).json({ message: "decrement made successfully" });
  } catch (err) {
    if (err instanceof OutOfStockError) {
      return res.status(409).json({ message: "out of stock error" });
    }

    return res
      .status(500)
      .json({ message: "an unknown server error was thrown" });
  }
});

const start = async () => {
  await setupDb();
  
  app.listen(Env.get("PORT"), () => {
    Logger.info(`app running on port ${Env.get("PORT")}`);
  });
};

start();
