import { MySqlConfig } from '../../../../../Shared/Infrastructure/Persistence/MySql/MySqlConfig';

export class MySqlConfigFactory {
  static createConfig(): MySqlConfig {
    return {
      user: String(process.env.DATABASE_USER),
      host: String(process.env.DATABASE_HOST),
      database: String(process.env.DATABASE_NAME),
      password: String(process.env.DATABASE_PASSWORD),
      port: Number(process.env.DATABASE_PORT),
    };
  }
}
