# Jukebox

## Purpose

This project has two main purposes

- Act as a playground for the authors, in which they can test and experiment with relatively-new technologies such as kubernetes, docker, grpc, protobuf, etc. under a service-oriented architecture. 
- Build a dope jukebox using Spotify's API

## Architecture Overview
This application is divided into three different services:

- Frontend (FE), which acts as the presentation layer
- Application (APP), which acts as the brain, doing the computation and supplying FE with content
- Mysql database, which acts as the primary agent for persistent storage

## Installation
This is a containerized application, and thus installation should be fairly straight-forward for those who have used Docker before. The application is broken up into Frontend, Application and Mysql services.

Here are the addresses for the live production services and what ports they expect what type of traffic on:


| Service        | Service ID           | IP  | Protocol | Port |
| ------------- |:-------------:|:--------:|:--------:|--------:|
| Frontend     |jb-fe-prod | 104.197.80.118 | HTTP | 80
|Application     | jb-app-prod      |   104.154.209.114 | RPC | 34000
| MySql | jb-sql-prod | 104.196.185.219 | TCP | 3306


Each of the three services live in their own containers. To experiment with any of them, simply do the following

- Clone this repository
- Decide which service you would like to work on
- Point it to the appropriate endpoints
- Install dependencies using 'npm install'
- Run your service using 'npm start'

If you're confused by the third step read this: when you run a service locally, you must tell it where to look for the other services. There are usually 2 mechanisms for doing this 1) environment variables 2) command-line arguments. I have chosen method 1. So for example, if I wanted to run FE locally, I could either point it to the live production APP service or run the APP service locally (in a docker container). Since it's easier, say I want to simply point it to the live APP service (hosted on a GKE cluster). I would run 
```{r, engine='bash', count_lines}
export APP_RPC_HOST=104.154.209.114
``` 
Which would export as an environment variable the location of the APP RPC server. I'd then build the application 
```{r, engine='bash', count_lines}
make build
```
Then start the FE service

```{r, engine='bash', count_lines}
cd fe
npm install
npm start
```

Now if you visit localhost:8080 on your machine (or inside your container if you're running the service using the Docker image) you'll see that your FE service is communicating with the live APP service. 

## Communication Pattern Deep-Dive
Since this is the first time I have designed a distributed application, I have kept all communication patterns simple. The APP service is also a bit too heavy and should be broken up into more modular services but again, I'm new to this space and wanted to just get my toes wet, while still gaining practice architecting an app following SOA principles. The communication pattern can be best understood through the use of an example. 

- A user visits the site's root page 
- FE receives the request
- FE leads user through the Spotify OAuth procedure 
- FE retrieves the necessary information to make API requests on behalf of the user (secret and refresh tokens) 
- FE sends these tokens to app via an RPC call
- FE renders spinner for user
- FE blocks and waits for a RPC response

- APP receives RPC
- APP makes a GET request to Spotify's API on /user/top/ 
- APP logs response in the database 
- APP makes a GET request to Spotify's API on /audio-features?ids={track-id+}
- APP computes default averages for audio features (jukebox parameters)
- APP responds to RPC with top tracks and list of parameters and their default values  

- FE receives RPC response and forwards user to /configure
- The user chooses seed tracks and adjusts playlist parameters
- The user triggers the CTA 
- FE sends RPC to APP with list of seed tracks and final parameter values

- APP receives the request
- APP makes a GET request to Spotify's API on /recommendations
- APP logs results in databse
- APP makes a PUT request to Spotify's API on /users/{user_id}/playlists
- APP responds to the RPC with the playlist's URI

- FE receives RPC response and forwards user to /play 
- The user is presented with a Spotify playlist widget containing their jukebox playlist

## Contributions
To contribute to this project (whether you are one of the original authors or not) do the following.
- Follow installation instrutions
- Do all your development on a separate branch (with a descriptive name)
- Submit a pull request
- Respond to any comments and make necessary changes
- Sit back and relax as your code changes the world :)
