import { PersonName } from '../../../../../src/Context/Mooc/Person/Domain/PersonName';
import { SearchPersonByName } from '../../../../../src/Context/Mooc/Person/Application/SearchPersonByName';
import { PersonRepositoryMock } from '../__mocks__/PersonRepositoryMock';
import { PersonMother } from '../Domain/PersonMother';
import { PersonApiRepositoryMock } from '../__mocks__/PersonApiRepositoryMock';
import { CacheRepositoryMock } from '../__mocks__/CacheRepositoryMock';
import { PhraseApiRepositoryMock } from '../__mocks__/PhraseApiRepositoryMock';
import { PersonPhrase } from '../../../../../src/Context/Mooc/Person/Domain/PersonPhrase';

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

describe('Buscar personaje por el nombre', () => {
  describe('Cuando el personaje no está en caché ni en la base de datos, pero sí existe en la API externa', () => {
    it('Debería retornar un personaje con sus atributos', async () => {
      const person = PersonMother.random();
      cacheRepository.returnOnFindByName(null);
      personRepository.returnOnFindByName(null);
      personApiRepository.returnOnFindByName(person);
      phraseApiRepository.returnOnGetPhrase(new PersonPhrase(person.phrase.value))
      const response = await searchPersonByName.run(new PersonName('Jhuder'));
      expect(response).toMatchObject(person.toPrimitives());
    });
  });

  describe('Cuando el personaje no está en caché, base de datos ni API externa', () => {
    it('Debería retornar una excepción con el mensaje (El personaje no ha sido encontrado)', async () => {
      personRepository.returnOnFindByName(null);
      personApiRepository.returnOnFindByName(null);
      await expect(searchPersonByName.run(new PersonName('Jhuder'))).rejects.toThrow(
        'El personaje no ha sido encontrado',
      );
    });
  });
});
