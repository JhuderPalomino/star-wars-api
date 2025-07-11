import { Request, Response } from 'lambda-api';
import { Controller } from './Controller';
import { MySqlPersonRepository } from '../../../Context/Mooc/Person/Infrastructure/Persistence/MySqlPersonRepository';
import { MySqlFactory } from '../../../Context/Shared/Infrastructure/Persistence/MySql/MySqlFactory';
import { MySqlConfigFactory } from '../../../Context/Mooc/Shared/Infrastructure/Persistence/MySql/MySqlConfigFactory';
import { PersonCreator } from '../../../Context/Mooc/Person/Application/PersonCreator';
import { BuildResponse } from '../../../Context/Mooc/Shared/Infrastructure/Response/BuildResponse';
import httpStatus from 'http-status';

type CreatePersonRequest = Request & {
  body: {
    name: string;
    birth_year: string;
    eye_color: string;
    gender: string;
    hair_color: string;
    height: string;
    mass: string;
    skin_color: string;
    created: string;
    edited: string;
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
        req.body.name,
        req.body.birth_year,
        req.body.eye_color,
        req.body.gender,
        req.body.hair_color,
        req.body.height,
        req.body.mass,
        req.body.skin_color,
        req.body.created,
        req.body.edited,
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
