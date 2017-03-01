# Jukebox

## Purpose

This project has two main purposes

- Act as a playground for the authors, in which they can test and experiment with relatively-new technologies such as kubernetes, docker, grpc, Google Container Engine (GKE), etc.
- Do something cool with Spotify API 

## Architecture Overview
This application is divided into four different services:

- Frontend (FE) which acts as the gateway to the app, accepting HTTP connections
- Application (APP) which acts as the brain of the application, coordinating processes through RPCs
- Tensorflow (TF) which acts as the computation engine, interfacing with Google's Tensorflow
- Mysql database, which acts as the primary agent for persistent storage

## Installation
This is a completely containerized application, and thus installation should be fairly straight-forward for those who have used Docker before. The application is broken up into 

Here are the addresses for the production services:


| Service        | Service ID           | IP  | Port |
| ------------- |:-------------:|:--------:|--------:|
| Frontend     |jb-fe-prod | 104.197.80.118 | 80
|Application     | jb-app-prod      |   104.154.209.114 | 34000
| Tensorflow | jb-tf-prod      |   104.137.88.102  | 35000
| MySql | jb-sql-prod | 104.196.185.219 | 3306


Each of the four services live in their own containers. To experiment with any of them, simply do the following

- Clone this repository
- Pick which service you would like to work on
- Point it to the appropriate endpoint
- Run your service using 'npm start'

If you're confused by the third step read this: when you run a service locally, you must tell it where to look for the other 3 services. There are usually 2 mechanisms for doing this 1) environment variables 2) command-line arguments. I have chosen method 1. So for example, if I wanted to run FE locally, and point it to the live app (hosted on a GKE cluster) I would run 
```{r, engine='bash', count_lines}
export APP_RPC_HOST=104.154.209.114
``` 
and then start the FE service normally using 
```{r, engine='bash', count_lines}
npm start
```

## Architecture Deep-Dive
Since this is the first time I have designed a distributed application, I have kept all communication patterns simple. The communication pattern can be best understood through the use of an example. 

- A user visits the site's root page 
- FE receives the request
- FE leads them through the Spotify OAuth procedure 
- FE retrieves the necessary information to make API requests on behalf of the user (secret and refresh tokens) 
- FE sends these tokens to app via an RPC call
- FE blocks and waits for a stream of results to be returned

- APP receives RPC
- APP service makes a series of requests on behalf of the user to Spotify's API
- APP logs necessary information in the database
- APP send user data via an RPC to the Tensorflow service 

- TF receives RPC
- TF service does the necessary computation and responds to the RPC

- APP receives the response
- APP processes data and responds to the original RPC (sent by FE)

- FE receives RPC response and renders an HTML page and shows the result to the user
