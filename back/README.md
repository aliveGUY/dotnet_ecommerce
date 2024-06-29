
## Development
Start project
```bash
docker-compose up --build -d
```

Stop project
```bash
docker-compose down -v
```

After project successfully started you should make sure that _**all containers are runing!!**_ (`migration`, `webapi`, `db`). Sometimes migrations could be skiped, without them db wont work.
```bash
docker ps
```


Access localhost
`http://localhost:8080/swagger/index.html`


## Tutorial
Create db migration

```bash
dotnet ef migrations add <NAME>
```

## Common issues
If db freezes on strtup, one of the common issues is that something is occupying port `5432`. You can check it by running this command: 

```bash
sudo lsof -i :5432
```

If it returned process, you could kill it using:
```bash
sudo kill -9 <PID>
``` 