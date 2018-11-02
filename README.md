
# Themisto

​web crawler to search products bassed on orders given by Ganymede 

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
This services has no public endpoints, it was made to receive request from ganymede

### List of private endpoints
The private API end points are used to comunication between services, and need be authenticate through [Bearer Authentication](https://swagger.io/docs/specification/authentication/bearer-authentication/)

| Type | URL |
| --- | --- |
| POST |http://127.0.0.1:5000/api/queries|




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
