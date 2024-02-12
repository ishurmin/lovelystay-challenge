# LovelyStay challenge
Command-line Node.js application that
* gets user details from GitHub by username and persists them in database
## How to run
### With docker (recommended)
1. Run the **database** container, **migration** and build the **cli** image
    ```shell
    docker-compose up -d
    ```
2. Run the **cli** container
    ```shell
    docker-compose run cli
    ```
3. Call the script inside the container
    ```
    node app.js
    ```

<details>

<summary>Other ways (require Node.js 21)</summary>

### With [tsx](https://github.com/privatenumber/tsx)
1. Run **database** and **migration** containers (or set it up manually)
    ```shell
    docker compose up -d database migration
    ```
2. Install dependencies
    ```shell
    npm install
    ```
3. Run the **cli** application providing `DB_URL` env
    ```shell
    DB_URL=postgres://postgres:postgres@localhost:5432/postgres tsx src/app.ts
    ```

### With node
1. Run **database** and **migration** containers (or set it up manually)
    ```shell
    docker compose up -d database migration
    ```
2. Install dependencies
    ```shell
    npm install
    ```
3. Build (TS -> JS)
    ```shell
    npm run build
    ```
4. Run the **cli** application providing `DB_URL` env
    ```shell
    DB_URL=postgres://postgres:postgres@localhost:5432/postgres node dist/app.js
    ```

</details>

## Commands
Add GitHub user to the database
```
node app.js add <username>
```

## Testing
```shell
npm run test
```