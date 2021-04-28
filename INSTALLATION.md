# Installation

Talawa API can be setup to run via node's default package manager `Npm`.


## Standard Installation

Follow these steps to get the api running using npm

1. Install these dependencies if you don't already have them
   - [Firebase](https://firebase.google.com/docs/web/setup) 
   - [MongoDB](https://docs.mongodb.com/manual/administration/install-community/)
   - [Nodejs](https://nodejs.org/en/)<br>
   <strong>Note:</strong><em>If you do not have MongoDB on your own system, you can proceed with the connection string. Please ensure the right access permissions and firewall openings for the VM/server where the MongoDB is hosted.</em>
2. Clone this repo to your local machine

   ```sh
   git clone https://github.com/PalisadoesFoundation/talawa-api
   cd talawa-api
   npm install
   ```

3. Create `.env` file in the root directory of the project
   `.env` file is used to store the secret or environment variables.

   ```sh
   touch .env
   ```

4. Copy the `.env.sample` to `.env`

5. Fill out the following fields:

   - ACCESS_TOKEN_SECRET
   - REFRESH_TOKEN_SECRET
   - MONGO_DB_URL

     Follow instructions in the comments at the top of `.env`

6. Install required node packages

   ```sh
   npm install
   ```

7. Now that we have all the packages, execute the following command to run the server.

   NB: You only have to execute the following command to run the server in future.

   ```sh
   npm run start
   ```

## Testing

```sh
npm run test
```


