import { MySqlRepository } from '../../../../Shared/Infrastructure/Persistence/MySql/MySqlRepository';
import { DataBaseRepository } from '../../Domain/DataBaseRepository';
import { PersonName } from '../../Domain/PersonName';
import { Person } from '../../Domain/Person';
import { format } from 'date-fns';
import { RedisFactory } from '../../../../Shared/Infrastructure/Persistence/Redis/RedisFactory';

export class MySqlPersonRepository extends MySqlRepository implements DataBaseRepository {
  async findByName(name: PersonName): Promise<Person | null> {
    const sql = `
    SELECT *
    FROM person
    WHERE name LIKE ?
    `;

    const values = [`%${name.value}%`];

    const response = await this.query(sql, values);
    if (!response || response.length === 0) {
      return null;
    }

    return Person.fromPrimitive({
      name: response[0].name,
      edited: response[0].edited,
      mass: response[0].mass,
      skin_color: response[0].skin_color,
      birth_year: response[0].birth_year,
      eye_color: response[0].eye_color,
      gender: response[0].gender,
      hair_color: response[0].hair_color,
      height: response[0].height,
      created: response[0].created,
    });
  }

  async findAll(page: number, perPage: number): Promise<Person[]> {
    const redisClient = await RedisFactory.createClient();
    const cacheKey = `data|${page}|${perPage}`;
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      return JSON.parse(cached).map((person: any) => Person.fromPrimitive(person));
    }
    const sql = `
    SELECT *
    FROM person
    LIMIT ? OFFSET ?
    `;

    const values = [perPage, (page - 1) * perPage];

    const response = await this.query(sql, values);
    if (!response || response.length === 0) {
      return [];
    }

    await redisClient.set(cacheKey, JSON.stringify(response));
    return response.map((person: any) => Person.fromPrimitive(person));
  }

  async save(person: Person): Promise<void> {
    const FORMAT = 'yyyy-MM-dd HH:mm:ss';
    const values = [
      person.name.value,
      person.birth_year.value,
      person.eye_color.value,
      person.gender.value,
      person.hair_color.value,
      person.height.value,
      person.mass.value,
      person.skin_color.value,
      format(new Date(person.created.value), FORMAT),
      format(new Date(person.edited.value), FORMAT),
    ];

    const sql = `
    INSERT INTO person
    (name, birth_year, eye_color, gender, hair_color, height, mass, skin_color, created, edited)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await this.query(sql, values);
  }
}
