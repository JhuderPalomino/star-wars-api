import { Person } from '../../Domain/Person';
import { CacheRepository } from '../../Domain/CacheRepository';
import { RedisRepository } from '../../../../Shared/Infrastructure/Persistence/Redis/RedisRepository';

export class RedisPersonRepository extends RedisRepository implements CacheRepository {
  async createConnection() {
    await this.connect();
  }
  async savePerson(person: Person, expireSeconds?: number) {
    const key = `person:${person.name.value}`;
    await this.set(key, JSON.stringify(person.toPrimitives()), expireSeconds);
  }

  async findByName(name: string) {
    const key = `person:${name}`;
    const data = await this.get(key);
    if (!data) return null;
    return JSON.parse(data);
  }

  async savePageData(page: number, perPage: number, personsArray: Person[]) {
    const key = `data|${page}|${perPage}`;
    const data = personsArray.map((person) =>
      person.toPrimitives ? person.toPrimitives() : person,
    );
    await this.set(key, JSON.stringify(data));
  }

  async findPageData(page: number, perPage: number) {
    const key = `data|${page}|${perPage}`;
    const data = await this.get(key);
    if (!data) return null;
    return JSON.parse(data);
  }

  async quitConnection() {
    await this.quit();
  }
}
