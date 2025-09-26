import Database from "./shared/database";
import Logger from "./shared/logger";

const database = Database.create();

async function deleteInventoryTable() {
  await database.sql(`
    DROP TABLE IF EXISTS inventory;
  `);
}

async function createInventoryTable() {
  await database.sql(`
    CREATE TABLE IF NOT EXISTS inventory (
      id serial primary key,
      productKey varchar(255) unique not null,
      quantity int not null default 100,
      product varchar(255)
    )
  `);
}

async function createInventoryRow() {
  await database.sql(
  `
    INSERT INTO inventory (productKey, quantity, product) VALUES ($1, $2, $3); 
  `,
    ["first-product", 100, "Nintendo Switch OLED 64GB"]
  );
}

export async function setupDb() {
  await deleteInventoryTable();
  await createInventoryTable();
  await createInventoryRow();

  Logger.debug('database setup finished with success');
}

