import Database from "./shared/database";
import OutOfStockError from "./out-of-stock-error";

const database = Database.create();

export default async function decrementInventory() { 
  const client = await database.connect();

  try {
    const firstQuery = await client.query('SELECT * FROM inventory WHERE productKey = $1;', ['first-product']);
    const firstProduct = firstQuery.rows[0];

    if (firstProduct.quantity === 0) { 
      throw new OutOfStockError();
    }

    client.query('BEGIN')
    const secondQuery = await client.query('SELECT * FROM inventory WHERE productKey = $1 FOR UPDATE;', ['first-product']);
    const secondProduct = secondQuery.rows[0]

    if (secondProduct.quantity > 0) { 
      await client.query('UPDATE inventory SET quantity = $1 - 1;', [secondProduct.quantity]);
      await client.query('COMMIT');
      return;
    }

    await client.query('ROLLBACK');

    throw new OutOfStockError();
  } finally {
    client.release();
  }
}