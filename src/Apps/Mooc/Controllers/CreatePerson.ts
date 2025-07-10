import { Request, Response } from 'lambda-api';
import { Controller } from './Controller';
import { MySqlPersonRepository } from '../../../Context/Mooc/Person/Infrastructure/Persistence/MySqlPersonRepository';
import { MySqlFactory } from '../../../Context/Shared/Infrastructure/Persistence/MySql/MySqlFactory';
import { MySqlConfigFactory } from '../../../Context/Mooc/Shared/Infrastructure/Persistence/MySql/MySqlConfigFactory';
import { PersonCreator } from '../../../Context/Mooc/Person/Application/Create/PersonCreator';
import { BuildResponse } from '../../../Context/Mooc/Shared/Infrastructure/Response/BuildResponse';
import httpStatus from 'http-status';

type CreatePersonRequest = Request & {
  body: {
    nombre: string;
    anio_nacimiento: string;
    color_ojos: string;
    genero: string;
    color_cabello: string;
    altura: string;
    masa: string;
    color_piel: string;
    fecha_creacion: string;
    fecha_actualizacion: string;
  };
};

export class CreatePerson implements Controller {
  async run(req: CreatePersonRequest, res: Response): Promise<void> {
    try {
      if (!req.body) {
        return BuildResponse.run(
          { status: httpStatus.BAD_REQUEST, message: 'Ingrese atributos del personaje' },
          res,
        );
      }
      const personRepository = new MySqlPersonRepository(
        MySqlFactory.createClient(MySqlConfigFactory.createConfig()),
      );
      const personCreator = new PersonCreator(personRepository);
      const response = await personCreator.run(
        req.body.nombre,
        req.body.anio_nacimiento,
        req.body.color_ojos,
        req.body.genero,
        req.body.color_cabello,
        req.body.altura,
        req.body.masa,
        req.body.color_piel,
        req.body.fecha_creacion,
        req.body.fecha_actualizacion,
      );
      return BuildResponse.run(response, res);
    } catch (e: Error | any) {
      console.error('>CreatePerson: ', e);
      return BuildResponse.run(
        { status: e.status || httpStatus.BAD_REQUEST, message: e.message },
        res,
      );
    }
  }
}
