import { PaginatePersons } from '../../../../../src/Context/Mooc/Person/Application/PaginatePersons';
import { PersonRepositoryMock } from '../__mocks__/PersonRepositoryMock';
import { PersonMother } from '../Domain/PersonMother';
import { CacheRepositoryMock } from "../__mocks__/CacheRepositoryMock";

let personRepository: PersonRepositoryMock;
let paginatePersons: PaginatePersons;
let cacheRepository: CacheRepositoryMock

beforeAll(() => {
  personRepository = new PersonRepositoryMock();
  cacheRepository = new CacheRepositoryMock()
  paginatePersons = new PaginatePersons(personRepository, cacheRepository);
});

describe('Paginar personajes', () => {
  describe('Existe personajes en la base de datos', () => {
    it('Debería retornar una lista paginada de personajes', async () => {
      const persons = [PersonMother.random(), PersonMother.random()];
      personRepository.findAll = jest.fn().mockResolvedValue(persons);

      const page = 1;
      const perPage = 2;
      const response = await paginatePersons.run(page, perPage);

      expect(response).toEqual({
        data: persons.map((p) => p.toPrimitives()),
        page,
        perPage,
        total: persons.length,
      });
      expect(personRepository.findAll).toHaveBeenCalledWith(page, perPage);
    });
  });

  describe('No existe personajes en la base de datos', () => {
    it('Debería retornar una lista vacía si no hay personajes', async () => {
      personRepository.findAll = jest.fn().mockResolvedValue([]);
      const page = 1;
      const perPage = 10;
      const response = await paginatePersons.run(page, perPage);
      expect(response).toEqual({
        data: [],
        page,
        perPage,
        total: 0,
      });
      expect(personRepository.findAll).toHaveBeenCalledWith(page, perPage);
    });
  });
});
