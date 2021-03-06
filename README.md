# Simple Serverless-offline AWS

## Setup
 - npm install
 - npm install serverless
 - npm install serverless-offline
 - npm install serverless-dynamodb-local
 - npm install webpack --save-dev
 - npm install serverless-webpack --save-dev
 - sls dynamodb install
 - npm install --save jimp
 - npm install --save-dev jest
 - npm install --save-dev @shelf/jest-dynamodb
 - npm install join
 - npm install --save-dev join
 - npm install --save-dev serverless-plugin-scripts
 - npm install serverless-s3-local --save-dev
 - npm install --save serverless-plugin-offline-dynamodb-stream
 - npm install --save serverless-plugin-offline-kinesis-stream
 - npm install serverless-offline-sns --save
 - npm install serverless-offline-sqs
 - npm install --save-dev serverless-offline-ses
 - npm install --save sequelize
 - npm install --save noop2
 - npm install --save pg pg-hstore

## Execution/Run
 - Command "sls offline (start)" start can be omitted.

## Docker for PostgreSQL
- Install docker/docker-compose
- Command"docker-compose up -d" must be inside directory of docker-compose.yml
- Credentials inside .yml file from above

## ElasticMQ for SES
 - Command "java -jar elasticmq-server-1.1.1.jar" must be inside directory of the jar file

## Tools
 - To generate json tables https://dynobase.dev/dynamodb-table-schema-design-tool/ 
