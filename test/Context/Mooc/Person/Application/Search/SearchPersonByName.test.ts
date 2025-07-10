import { PersonName } from '../../../../../../src/Context/Mooc/Person/Domain/PersonName';
import { SearchPersonByName } from '../../../../../../src/Context/Mooc/Person/Application/Search/SearchPersonByName';
import { ExternalApiRepositoryMock } from '../../__mocks__/ExternalApiRepositoryMock';
import { PersonRepositoryMock } from '../../__mocks__/PersonRepositoryMock';
import { PersonMother } from '../../Domain/PersonMother';

let externalApiRepository: ExternalApiRepositoryMock;
let personRepository: PersonRepositoryMock;
let searchPersonByName: SearchPersonByName;

beforeAll(() => {
  externalApiRepository = new ExternalApiRepositoryMock();
  personRepository = new PersonRepositoryMock();
  searchPersonByName = new SearchPersonByName(personRepository, externalApiRepository);
});

describe('Recuperar personaje por el nombre', () => {
  describe('El personaje no existe en la base de datos pero si existe en la api', () => {
    it('Debería retornar un personaje con sus atributos traducidos', async () => {
      const person = PersonMother.random();
      personRepository.returnOnFindByName(null);
      externalApiRepository.returnOnFindByName(person);
      const response = await searchPersonByName.run(new PersonName('Jhuder'));
      expect(response).toMatchObject(person.toPrimitivesSpanish());
    });
  });

  describe('El personaje no existe en la base de datos ni en la api', () => {
    it('Debería retornar una excepción con el mensaje (El personaje no ha sido encontrado)', async () => {
      personRepository.returnOnFindByName(null);
      externalApiRepository.returnOnFindByName(null);
      await expect(searchPersonByName.run(new PersonName('Jhuder'))).rejects.toThrow(
        'El personaje no ha sido encontrado',
      );
    });
  });
});
