# STAR WARS API

### Node version

- 20.x

### Serverless version

- 3.27.x

---

## Desarrollo

1. Clonar

   ```bash
   git clone git@github.com:JhuderPalomino/star-wars-api.git
   cd star-wars-api
   ```

2. Instalar dependencias

   ```bash
   npm install
   ```

3. Modificar las variables de entorno

   Revisar `env.example.json` y editar según las instrucciones

   ```bash
   cp env.example.json env.<stage>.json
   ```

4. Seleccionar AWS profile

   ```bash
   export AWS_PROFILE=<profile>
   ```

---

## Documentación

https://documenter.getpostman.com/view/14272090/2sB34fkg25

## Repositorio

https://github.com/JhuderPalomino/star-wars-api.git

# EndPoints

1. Para crear un personaje: POST https://5owr4v14m6.execute-api.us-east-2.amazonaws.com/dev/person/almacenar

```Json
{
   "name": "Jhuder Palomino",
   "birth_year": "19BBY",
   "eye_color": "dark",
   "gender": "male",
   "hair_color": "dar",
   "height": "170",
   "mass": "70",
   "skin_color": "fair",
   "created": "2025-09-07T08:50:51.000Z",
   "edited": "2025-09-07T08:50:51.000Z",
   "phrase": ""
}
```

2. Para buscar un personaje: GET https://5owr4v14m6.execute-api.us-east-2.amazonaws.com/dev/person/fusionados?name=Leia
3. Para listar los personajes: GET https://5owr4v14m6.execute-api.us-east-2.amazonaws.com/dev/person/historial?page=1&perPage=10

---

# Consideraciones

1. El proyecto está enfocado la arquitectura hexagonal
2. La carpeta App contiene la configuración del servidor
3. La carpeta Context contiene la lógica de negocio
4. La carpeta Handlers contiene los adaptadores para aws-lambda

## Inicializar las bases de datos mysql en docker

```bash
docker run --name mysql -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:8.0.22
```

## Crear la tabla de personajes (Person)

```sql
CREATE TABLE person (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birth_year VARCHAR(10),
    eye_color VARCHAR(50),
    gender VARCHAR(20),
    hair_color VARCHAR(50),
    height VARCHAR(10),
    mass VARCHAR(10),
    skin_color VARCHAR(50),
    phrase TEXT,
    created DATETIME,
    edited DATETIME
);
```

## Compilar el proyecto

```bash
npm run build
```

## Ejecutar test

```bash
npm run test
```

## Ejecutar localmente

1. Tener instalado serverless-offline

```bash
 npm i -g serverless-offline
```

2. Ejecutar:

```bash
 npm run start:local
```

## Despliegue a AWS

```bash
npm run deploy:dev
```
