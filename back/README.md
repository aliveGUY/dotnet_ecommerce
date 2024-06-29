
## Development
Turn on db
```bash
docker-compose up --build -d
```

Shut down db
```bash
docker-compose down -v
```

Access localhost
`http://localhost:8080/swagger/index.html`


## Tutorial
Create db migration
```bash
dotnet ef migrations add <NAME>
```

Add db migration
```bash
dotnet ef database update
```