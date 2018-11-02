# Ganymede

​search web service for sirena

## Install

You need to copy the example env file and change as needed. 
The MongoDB is cloud based you dont need to have it un your system
This application was made to run on AWS Lambda but you can try it locally using [Serverless Framework](https://github.com/serverless/serverless) 

```bash
cp .env.example .env
npm install 
npm run dev
```

Now you can start searching using the app.

## Usage
### List of public endpoints

| Type | URL |
| --- | --- |
| GET | http://127.0.0.1:3000/api/product/search-orders?page={page} 
| GET | http://127.0.0.1:3000/api/product/search-orders |
| GET | http://127.0.0.1:3000/api/product/search-orders/{id} |
| POST |http://127.0.0.1:3000/api/product/search-orders|
| GET |http://127.0.0.1:3000/api/product?page={page}|
| GET |http://127.0.0.1:3000/api/product|
| GET |http://127.0.0.1:3000/api/product/{id}|

### List of private endpoints
The private API end points are used to comunication between services, and need ne authenticate thorught [Bearer Authentication](https://swagger.io/docs/specification/authentication/bearer-authentication/)

| Type | URL |
| --- | --- |
| POST |http://127.0.0.1:3000/api/product|
| PUT |http://127.0.0.1:3000/api/product/{id}|
| GET |http://127.0.0.1:3000/api/category?page={page}|
| GET |http://127.0.0.1:3000/api/category|
| GET |http://127.0.0.1:3000/api/category/{id}|
| POST |http://127.0.0.1:3000/api/category|
| PUT |http://127.0.0.1:3000/api/category/{id}|
| PUT |http://127.0.0.1:3000/api/callback/{id}|
| GET |http://127.0.0.1:3000/api/app?page={page}|
| GET |http://127.0.0.1:3000/api/app|
| GET |http://127.0.0.1:3000/api/app/{id}|
| POST |http://127.0.0.1:3000/api/app|
| PUT |http://127.0.0.1:3000/api/app/{id}|



## Unit tests
In order to run the unit test you can do
```bash
npm run test
```
To see the coverage report
```bash
npm run test-coverage
```


## Credits
[Carlos Alvarez](https://github.com/Alvarz)

## License

MIT
