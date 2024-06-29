FROM postgres:latest

EXPOSE 5432

# Use the official .NET SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy csproj and restore as distinct layers
COPY *.csproj ./
RUN dotnet restore 

# Copy everything else and build the app
COPY . ./
RUN dotnet publish -c Release -o out

## Run migrations
FROM build as migrations
RUN dotnet tool install --global dotnet-ef
ENV PATH="$PATH:/root/.dotnet/tools"
ENTRYPOINT dotnet-ef database update --project ./ --startup-project ./

# Use the official ASP.NET Core runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/out .

# Expose the port your app runs on
EXPOSE 8080

# Set the entry point for the container
ENTRYPOINT ["dotnet", "back.dll"]
