import { Connection, RowDataPacket } from 'mysql2';

export class MySqlRepository {
  constructor(private _client: Connection) {}

  protected async query(query: string, values: string[] | number[]): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this._client.query(query, values, (err, results: RowDataPacket[]) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(results);
      });
    });
  }

  protected close() {
    this._client.end();
  }
}
