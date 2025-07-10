import mysql, { Connection } from 'mysql2';
import { MySqlConfig } from './MySqlConfig';

export class MySqlFactory {
  private static instance: Connection;

  static createClient(config: MySqlConfig): Connection {
    try {
      if (!MySqlFactory.instance) {
        MySqlFactory.instance = mysql.createConnection({
          user: config.user,
          host: config.host,
          database: config.database,
          password: config.password,
          port: config.port,
        });

      }

      return MySqlFactory.instance;
    } catch (e) {
      console.log('> Error instancia mysql: ', e);
      throw new Error('Internal error');
    }
  }
}
