import { API } from 'lambda-api';
import { SearchPerson } from '../Controllers/SearchPerson';
import { CreatePerson } from '../Controllers/CreatePerson';
import { ListPersons } from "../Controllers/ListPersons";

const register = (api: API): void => {
  const searchPerson = new SearchPerson();
  const createPerson = new CreatePerson();
  const listPersons = new ListPersons();

  api.get('/fusionados', searchPerson.run);
  api.post('/almacenar', createPerson.run);
  api.get('/historial', listPersons.run);
};

export default register;
