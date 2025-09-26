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
  const init = Date.now();
  try {
    await decrementInventory();
    const end = Date.now();

    Logger.info(`POST /inventory finished with status 201 - ${end - init}ms`);
    return res.status(201).json({ message: "decrement made successfully" });
  } catch (err) {
    const end = Date.now();
    if (err instanceof OutOfStockError) {
      Logger.info(`POST /inventory finished with status 409 - ${end - init}ms`);
      return res.status(409).json({ message: "out of stock error" });
    }
    
    Logger.info(`POST /inventory finished with status 500 - ${end - init}ms`);
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
