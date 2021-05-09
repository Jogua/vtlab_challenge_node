# Challenge NodeJS and MongoDB

###### Español

#### Implementación

Se ha creado la peetición solicitada en la url /api/v1/deliveries/filter.

Los parametros son:
    - "dateFrom": ISODate, por ejemplo: "2020-01-01T01:01:00.000Z"
    - "dateTo": ISODate, por ejemplo: "2020-01-01T01:01:00.000Z"
    - "weight": Numero, por ejemplo: "90000"
    - limit: (opcional) Numero, por ejemplo "10"
    - page: (opcional) Numero, por ejemplo "1"

#### Introducción

El presente desafío pretende evaluar el nivel de experiencia de un desarrollador NodeJS que ha trabajado con MongoDB.

El respositorio contiene un proyecto en NodeJS de ejemplo, con mongoose y express, y un mínimo de endpoints, modelos y servicios.

#### Como iniciar el proyecto

Para poder correr el proyecto en tu ordenador, vas a necesitar:
- [NodeJS](https://nodejs.org/es/download/) 12 o versión superior corriendo en tu ordenador
- MongoDB [instalado](https://docs.mongodb.com/manual/installation/) y corriendo en el puerto 27017

Para iniciar el proyecto, debes ejecutar:
- `npm install`
- `npm start`

La primera vez que inicies el proyecto, se creará una base de datos en tu mongoDB local bajo el nombre de `challenge_v1_db` y será populada con datos falsos que te permitirán completar la tarea.

Para poder consultar los diferentes endpoints, hemos dejado un archivo con todos los request para que puedas importar a tu Postman en este repositorio en `libs/postman/challenge_v1.postman_collection.json`

O puedes usar los siguientes comandos curl desde tu cliente bash:

```
curl --location --request GET 'http://localhost:4000/api/v1/deliveries/6091816209c2c702f45b6ebb'

curl --location --request GET 'http://localhost:4000/api/v1/deliveries/?limit=15&page=1'

curl --location --request POST 'http://localhost:4000/api/v1/deliveries/' \
--header 'Content-Type: application/json' \
--data-raw '{
    "when": "2020-01-01T01:01:00.000Z",
    "origin": {
      "street": "Alcalá",
      "number": "375",
      "city": "Madrid",
      "postalCode": "28001"
    },
    "destination": {
      "street": "Alcalá",
      "number": "550",
      "city": "Madrid",
      "postalCode": "28001"
    },
    "products": ['\'''\'']
}'

curl --location --request GET 'http://localhost:4000/api/v1/products/?limit=15&page=1'

curl --location --request GET 'http://localhost:4000/public/web/tracking/6091816209c2c702f45b6ebb'
```

#### Modelo de datos
Este proyecto contiene dos entidades:
+ Deliveries:
    + when: ISODate con la fecha de delivery
    + origin: Object que contiene la dirección de pickup
    + destination: Object que contiene la dirección de delivery
    + products: Array de ids de productos que ya existen en la colección de products.
+ Products:
    + reference: Nombre del producto,
    + description: Descripción del producto,
    + weight: Peso del producto en gramos,
    + height: Altura del producto en centímetros


## Desafío
Deberas crear un nuevo endpoint bajo la ruta /api/v1/deliveries/... que permita al cliente filtrar deliveries en base a ciertas características de los productos.

Este endpoint recibirá como parámetro:
 + dateFrom: ISODate
 + dateTo: ISODate
 + weight: Number
 + page: Number (número de página a devolver)
 + limit: Number (Cantidad de resultados a devolver)
 
La query debe devolver todos los deliveries contemplados en el rango de fecha, que contienen al menos un producto cuyo peso es igual o superior al peso enviado como parámetro.

La respuesta debe contener:
+ totalResults: Number (Cantidad de documentos totales que coinciden con la query)
+ deliveries: Array (Con los documentos de delivery encontrados y sus productos populados)

Ejemplo:
```
Parameters sent:
 + dateFrom: "2021-01-05T00:01:00.000Z"
 + dateTo: "2021-06-05T00:01:00.000Z"
 + weight: 15000,
 + page: 1,
 + limit 1,

Response received:
{
    totalResults: 100,
    deliveries: [{
                        "origin": {
                            "street": "Quigley Ford",
                            "number": "32821",
                            "postalCode": "40359",
                            "city": "Mullerchester"
                        },
                        "destination": {
                            "street": "Bradley Unions",
                            "number": "43477",
                            "postalCode": "42975",
                            "city": "West Casimerton"
                        },
                        "products": [
                         {
                                        "_id": "6091816b15ba8e038ff57fbd",
                                        "reference": "Handcrafted Fresh Chicken",
                                        "description": "The Apollotech B340 is an affordable wireless mouse with reliable connectivity, 12 months battery life and modern design",
                                        "weight": 17193,
                                        "height": 68545,
                                        "__v": 0
                                    },
                                    {
                                        "_id": "6091816b15ba8e038ff57fbe",
                                        "reference": "Handmade Fresh Mouse",
                                        "description": "The automobile layout consists of a front-engine design, with transaxle-type transmissions mounted at the rear of the engine and four wheel drive",
                                        "weight": 71848,
                                        "height": 85455,
                                        "__v": 0
                                    },
                                    {
                                        "_id": "6091816b15ba8e038ff57fbf",
                                        "reference": "Small Steel Keyboard",
                                        "description": "The Football Is Good For Training And Recreational Purposes",
                                        "weight": 10858,
                                        "height": 41586,
                                        "__v": 0
                                    }
                        ],
                        "_id": "6091816209c2c702f45b6ebb",
                        "when": "2021-05-05T16:45:55.736Z",
                        "__v": 0
                }]
}
```
Estimamos que un tiempo razonable para que puedas resolver este desafío es de 4 horas.

 
 
