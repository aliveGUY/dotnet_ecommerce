FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

COPY back.csproj ./
RUN dotnet restore ./back.csproj

COPY . .
RUN dotnet build ./back.csproj -c Release -o /app/build

FROM build AS publish
RUN dotnet publish ./back.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

COPY --from=publish /app/publish .

ENTRYPOINT ["dotnet", "back.dll"]
