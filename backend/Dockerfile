FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

COPY src/OrderManagement.sln ./src/
COPY src/OrderManagement.Domain/*.csproj ./src/OrderManagement.Domain/
COPY src/OrderManagement.Application/*.csproj ./src/OrderManagement.Application/
COPY src/OrderManagement.Infrastructure/*.csproj ./src/OrderManagement.Infrastructure/
COPY src/OrderManagement.API/*.csproj ./src/OrderManagement.API/
RUN dotnet restore src/OrderManagement.sln

COPY src/ ./src/
RUN dotnet publish src/OrderManagement.API/OrderManagement.API.csproj -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /out .
ENTRYPOINT ["dotnet", "OrderManagement.API.dll"]
