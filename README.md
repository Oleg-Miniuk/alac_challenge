## Description

Hello to whoever looks.
Here is a completed task with storing-getting the data from EP.

## Check

### Storing Endpoint:

POST 
http://alacritychallenge2-env.eba-qfn33pmz.us-east-2.elasticbeanstalk.com/storing/store-data

Body:
id: string
encryption_key: string
value: valid JSON type

### Retrieval Endpoint:

POST (is used to prevent sensitive information exposure through query strings in url)
http://alacritychallenge2-env.eba-qfn33pmz.us-east-2.elasticbeanstalk.com/storing/get-data

Body:
id: string
decryption_key: string


## Installation

```bash
$ npm install
$ npm run start:dev
```

## Running & deploying the app

```bash
# development
$ npm run start:dev

**To run this service locally on your machine I need to configure IAM role for you in my AWS account**

# deploying
$ npm run deploy

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
