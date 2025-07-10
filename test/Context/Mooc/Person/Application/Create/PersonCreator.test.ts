import { PersonCreator } from '../../../../../../src/Context/Mooc/Person/Application/Create/PersonCreator';
import { PersonRepositoryMock } from '../../__mocks__/PersonRepositoryMock';
import { PersonMother } from '../../Domain/PersonMother';

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
        const newPersonPrimitive = newPerson.toPrimitivesSpanish();
        const response = await personCreator.run(
          newPersonPrimitive.nombre,
          newPersonPrimitive.anio_nacimiento,
          newPersonPrimitive.color_ojos,
          newPersonPrimitive.genero,
          newPersonPrimitive.color_cabello,
          newPersonPrimitive.altura,
          newPersonPrimitive.masa,
          newPersonPrimitive.color_piel,
          newPersonPrimitive.fecha_creacion,
          newPersonPrimitive.fecha_actualizacion,
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
            newPerson.nombre,
            newPerson.anio_nacimiento,
            newPerson.color_ojos,
            newPerson.genero,
            newPerson.color_cabello,
            newPerson.altura,
            newPerson.masa,
            newPerson.color_piel,
            newPerson.fecha_creacion,
            newPerson.fecha_actualizacion,
          ),
        ).rejects.toThrow('El campo año_nacimiento tiene que tener el formato [xxBBY, xxABY, unknown]');
      });
    });
  });

  describe('El personaje ya está registrado en la base de datos', () => {
    it('Debería retornar una excepción con el mensaje (El personaje Jhuder ya está registrado)', async () => {
      const newPerson = PersonMother.random().toPrimitivesSpanish();
      repository.returnOnFindByName(newPerson);
      await expect(
        personCreator.run(
          newPerson.nombre,
          newPerson.anio_nacimiento,
          newPerson.color_ojos,
          newPerson.genero,
          newPerson.color_cabello,
          newPerson.altura,
          newPerson.masa,
          newPerson.color_piel,
          newPerson.fecha_creacion,
          newPerson.fecha_actualizacion,
        ),
      ).rejects.toThrow(`El personaje ${newPerson.nombre} ya está registrado`);
    });
  });
});
