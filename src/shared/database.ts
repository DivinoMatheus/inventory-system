import { Pool } from 'pg'
import Env from './env';

export default class Database { 
  private readonly pool: Pool
  private static database: Database;
  

  public static create() { 
    if (!this.database) {
      this.database = new Database()
    }
    
    return this.database;
  }

  private constructor() { 
    this.pool = new Pool({
      user: Env.get('DB_USER'),
      password: Env.get('DB_PASSWORD'),
      database: Env.get('DB_NAME'),
      host: Env.get('DB_HOST'),
      port: parseInt(Env.get('DB_PORT') as string, 10),
      max: 10
    });
  }

  async connect() {
    const client = await this.pool.connect();
    return client;
  }

  async sql(sqlCommand: string, params?: (string | number | boolean)[]) { 
    const client = await this.pool.connect();

    const result = await client.query(sqlCommand, params);

    return result;
  }

  async beginTransaction() { 
    await this.pool.query('BEGIN');
  }

  async commit() {
    await this.pool.query('COMMIT');
  }

  async rollback() { 
    await this.pool.query('ROLLBACK');
  }
}