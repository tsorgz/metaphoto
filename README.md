# Project Name

This project contains a backend API server and frontend web application. 
## Backend

The backend is a Node.js app using Fastify. It provides RESTful APIs for the frontend.
### Installation

Copy code
``` bash
cd metaphoto-api
npm install
```

### Run locally

Copy code
``` bash
npm start
```

This will start the server on port 3003.

### Deployment

The backend is deployed to Google Cloud Run. New builds are ~~automatically~~ *(WIP: TODO Fix Federation Permissions For GHA Service Account Identity Pool)* triggered on pushes to main.

The live API can be reached at [meta-api.tsorgz.com](https://meta-api.tsorgz.com)

### API Documentation

**(TODO: Make OpenAPI Documentation Accessible for local builds)**

There is only 1 endpoint `/photos` where users can request the following filters:
* `title`: The title of the photos being filtered. Returns all photos with the filtered phrase contained in its title.
* `album.title`: The title of the albums being filtered. Returns all photos from albums with the filtered phrase contained in its title.
* `album.user.email`: The email of the user being filtered. Returns all photos with the filtered user defined.
* `limit`: The number of results to be returned.
* `offset`: The number of entries skipped beginning results from the server.

## Frontend

The frontend is a Next.js application. It uses create-next-app.

### Installation

Copy code
```bash
cd metaphoto-app 
npm install
```
### Run locally

Copy code
```bash
npm run dev
```

This will start the dev server on port 3000.

### Deployment

The frontend is hosted on Google Cloud Run. New builds are triggered ~~automatically~~ *(WIP: TODO Fix Federation Permissions For GHA Service Account Identity Pool)* from the main branch.

The live site is at (metaphoto.tsorgz.com)[https://metaphoto.tsorgz.com]

### Full Stack

The frontend communicates with the backend via API calls. The full stack can be run locally using the instructions above to start the backend and frontend servers simultaneously.


## Known Issues
* Workplace Identity Federation not working for CI/CD, deployments will fail until this
* LLM Integration not implemented on the frontend, and off via Feature Flag on backend to prevent OpenAI bill from skyrocketing


## Future Imporovements
* Swagger documentation for backend service
* Some interactivity and animations for UX
* Incremental Static Regeneration would help improve SSR pages if the data actually changed
* Get rid of Vercel branding on favicon