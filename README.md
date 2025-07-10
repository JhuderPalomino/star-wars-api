# Api start war

## Documentación

https://documenter.getpostman.com/view/

## Repositorio

https://github.com/JhuderPalomino/start-war-api.git

# EndPoints

1. Para crear nuevos personajes: POST https://5owr4v14m6.execute-api.us-east-2.amazonaws.com/dev/almacenar

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
  "edited": "2025-09-07T08:50:51.000Z"
}
```

2. Para buscar un personaje: GET https://5owr4v14m6.execute-api.us-east-2.amazonaws.com/dev/fusionados?name=luke

# Consideracion

1. El proyecto está enfocado la arquitectura hexagonal
2. La carpeta App contiene la configuración del servidor
3. La carpeta Context contiene la lógica de negocios
4. La carpeta Handlers contiene 

## Inicializar las bases de datos

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
    created DATETIME,
    edited DATETIME
);
```

## Build project

```bash
npm run build
```

## test

```bash
npm run test
```

## Crear variables de entorno

Crea un archivo env.dev.json y copia los valores que hay en el archivo de example.dev.json

## Ejecutar entorno local

1. Se tiene que tener serverless-offline para instalar: npm i -g serverless-offline
2. Ejecutar: npm run start:local

## Despliegue a AWS

Ejecutar: npm run deploy:dev
