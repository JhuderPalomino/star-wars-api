import { PersonCreator } from '../../../../../src/Context/Mooc/Person/Application/PersonCreator';
import { PersonRepositoryMock } from '../__mocks__/PersonRepositoryMock';
import { PersonMother } from '../Domain/PersonMother';

let repository: PersonRepositoryMock;
let personCreator: PersonCreator;

beforeAll(() => {
  repository = new PersonRepositoryMock();
  personCreator = new PersonCreator(repository);
});

describe('Crear nuevos personajes', () => {
  describe('El personaje no está registrado en la base de datos', () => {
    describe('Todos los atributos del personaje están correctos', () => {
      it('Debería registrar en la base de datos y devolver el personaje', async () => {
        const newPerson = PersonMother.random();
        const newPersonPrimitive = newPerson.toPrimitives();
        const response = await personCreator.run(
          newPersonPrimitive.name,
          newPersonPrimitive.birth_year,
          newPersonPrimitive.eye_color,
          newPersonPrimitive.gender,
          newPersonPrimitive.hair_color,
          newPersonPrimitive.height,
          newPersonPrimitive.mass,
          newPersonPrimitive.skin_color,
          newPersonPrimitive.created,
          newPersonPrimitive.edited,
        );
        repository.assertSaveHaveBeenCalledWith(newPerson);
        expect(response).toMatchObject(newPersonPrimitive);
      });
    });

    describe('El atributo año_nacimiento tiene un mal formato', () => {
      it('Debería retornar una excepción con el mensaje (El campo año_nacimiento tiene que tener el formato [xxBBY, xxABY, unknown])', async () => {
        const newPerson = PersonMother.invalidBirthYear();
        await expect(
          personCreator.run(
            newPerson.name,
            newPerson.birth_year,
            newPerson.eye_color,
            newPerson.gender,
            newPerson.hair_color,
            newPerson.height,
            newPerson.mass,
            newPerson.skin_color,
            newPerson.created,
            newPerson.edited,
          ),
        ).rejects.toThrow(
          'El campo año_nacimiento tiene que tener el formato [xxBBY, xxABY, unknown]',
        );
      });
    });
  });

  describe('El personaje ya está registrado en la base de datos', () => {
    it('Debería retornar una excepción con el mensaje (El personaje Jhuder ya está registrado)', async () => {
      const newPerson = PersonMother.random().toPrimitives();
      repository.returnOnFindByName(newPerson);
      await expect(
        personCreator.run(
          newPerson.name,
          newPerson.birth_year,
          newPerson.eye_color,
          newPerson.gender,
          newPerson.hair_color,
          newPerson.height,
          newPerson.mass,
          newPerson.skin_color,
          newPerson.created,
          newPerson.edited,
        ),
      ).rejects.toThrow(`El personaje ${newPerson.name} ya está registrado`);
    });
  });
});
