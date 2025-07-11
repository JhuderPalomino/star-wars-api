import { MySqlRepository } from '../../../../Shared/Infrastructure/Persistence/MySql/MySqlRepository';
import { DatabaseRepository } from '../../Domain/DatabaseRepository';
import { PersonName } from '../../Domain/PersonName';
import { Person } from '../../Domain/Person';
import { format } from 'date-fns';

export class MySqlPersonRepository extends MySqlRepository implements DatabaseRepository {
  async findByName(name: PersonName): Promise<Person | null> {
    const sql = `
    SELECT *
    FROM person
    WHERE name LIKE ?
    LIMIT 1
    `;

    const values = [`%${name.value}%`];

    const response = await this.query(sql, values);

    if (!response || response.length === 0) {
      return null;
    }
    const row = response[0];

    return Person.fromPrimitives({
      name: row.name,
      edited: row.edited,
      mass: row.mass,
      skin_color: row.skin_color,
      birth_year: row.birth_year,
      eye_color: row.eye_color,
      gender: row.gender,
      hair_color: row.hair_color,
      height: row.height,
      created: row.created,
    });
  }

  async findAll(page: number, perPage: number): Promise<Person[]> {
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

    return response.map((person: any) => Person.fromPrimitives(person));
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
