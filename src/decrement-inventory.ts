import Database from "./shared/database";
import OutOfStockError from "./out-of-stock-error";

const database = Database.create();

export default async function decrementInventory() { 
  const client = await database.connect();

  try {
    client.query('BEGIN')
    const result = await client.query('SELECT * FROM inventory WHERE productKey = $1 FOR UPDATE;', ['first-product']);
    const product = result.rows[0];

    if (product.quantity > 0) { 
      await client.query('UPDATE inventory SET quantity = $1 - 1;', [product.quantity]);
      await client.query('COMMIT');
      return;
    }

    await client.query('ROLLBACK');

    throw new OutOfStockError();
  } finally {
    client.release();
  }
}