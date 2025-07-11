import { PersonName } from '../../../../../src/Context/Mooc/Person/Domain/PersonName';
import { SearchPersonByName } from '../../../../../src/Context/Mooc/Person/Application/SearchPersonByName';
import { PersonRepositoryMock } from '../__mocks__/PersonRepositoryMock';
import { PersonMother } from '../Domain/PersonMother';
import { PersonApiRepositoryMock } from '../__mocks__/PersonApiRepositoryMock';
import { CacheRepositoryMock } from '../__mocks__/CacheRepositoryMock';
import { PhraseApiRepositoryMock } from '../__mocks__/PhraseApiRepositoryMock';

let cacheRepository: CacheRepositoryMock;
let personApiRepository: PersonApiRepositoryMock;
let phraseApiRepository: PhraseApiRepositoryMock;
let personRepository: PersonRepositoryMock;
let searchPersonByName: SearchPersonByName;

beforeAll(() => {
  personApiRepository = new PersonApiRepositoryMock();
  personRepository = new PersonRepositoryMock();
  phraseApiRepository = new PhraseApiRepositoryMock();
  cacheRepository = new CacheRepositoryMock();
  searchPersonByName = new SearchPersonByName(
    personRepository,
    personApiRepository,
    phraseApiRepository,
    cacheRepository,
  );
});

describe('Recuperar personaje por el nombre', () => {
  describe('El personaje no existe en la base de datos pero si existe en la api', () => {
    it('Debería retornar un personaje con sus atributos traducidos', async () => {
      const person = PersonMother.random();
      personRepository.returnOnFindByName(null);
      personApiRepository.returnOnFindByName(person);
      const response = await searchPersonByName.run(new PersonName('Jhuder'));
      expect(response).toMatchObject(person.toPrimitives());
    });
  });

  describe('El personaje no existe en la base de datos ni en la api', () => {
    it('Debería retornar una excepción con el mensaje (El personaje no ha sido encontrado)', async () => {
      personRepository.returnOnFindByName(null);
      personApiRepository.returnOnFindByName(null);
      await expect(searchPersonByName.run(new PersonName('Jhuder'))).rejects.toThrow(
        'El personaje no ha sido encontrado',
      );
    });
  });
});
