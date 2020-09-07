## Description

Hello to whoever is reading this.

Here is a completed task with storing-receiving the data from EP.

Let me underline that it is a proto-proto-typing implementaion just for checking.

## Technical Stack
NestJS/TS, Jest, AWS DynamoDB, AWS Elastic Beanstalk

## QA
Code quality: eslint

Unit-testing and e2e testing on git hooks.

Of course, the real solution would be to add stages to CI/CD pipeline for unit-testing and e2e testing on each environment.

## Must-have improvements

1) Docker, ECR, ECS/Fargate
2) CI/CD
3) Multiple environments (dev ... pre-prod, prod)
3) Api Gateway, Load Balancer
4) VPC, public & private subnets
5) Security policies
6) Fault tolerance (AWS availability zones, Dynamo replicas etc)

## Check

### Storing Endpoint:

POST 
http://alacritychallenge2-env.eba-qfn33pmz.us-east-2.elasticbeanstalk.com/storing/store-data

Body:\
**id**: string\
**encryption_key**: string\
**value**: valid JSON type

### Retrieval Endpoint:

POST (is used to prevent sensitive information exposure through query strings in url)\
http://alacritychallenge2-env.eba-qfn33pmz.us-east-2.elasticbeanstalk.com/storing/get-data

Body:\
**id**: string\
**decryption_key**: string


## Installation, Running & Deploying the app

```bash
$ npm install

# development
$ npm run start:dev

**To run this service locally on your machine I need to configure IAM role for you in my AWS account**

# deploying
$ npm run deploy
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Thank you for review
Oleg

oleg.miniuk@gmail.com
https://www.linkedin.com/in/oleg-miniuk/
