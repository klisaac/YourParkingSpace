# YourParkingSpace Pokémon 
A test Pokémon application developed using .NET 8 (Clean Architecture & CQRS patterns) for the API and React for the frontend.

## Getting Started
Follow these instructions to get the project up and running.

## Prerequisites
You will need the following:
* [.NET 8, Node 18.x or higher, Visual Studio 2022, Visual Studio Code]

## Setup
Follow the below steps to run the test Pokémon application:

  1. Unzip the file: "YourParkingSpace.zip" or clone or download the GitHub repository: "https://github.com/klisaac/YourParkingSpace.git" which contains the folders: "PokemonApi" & "PokemonUI".

  2. Navigate to PokemonApi folder, open the solution file: "PokemonWebApi.sln from Visual Studio 2022, build & run which will launch the swagger: "http://localhost:5000/swagger/index.html"

  3. Generate a JWT bearer token from the endpoint: "http://localhost:5000/api/Login/authenticate" using the user name: "pokemon@yps.com" & password: "pokemon". 

  4. Launch Postman & perform POST operation at the endpoint: "http://localhost:5000/api/Pokemon/loadDbFromExternalApi" using the above bearer token for authentication, which will insert Pokémon data from the external endpoint: "https://pokeapi.co/api/v2/pokemon/ditto", into local SQLite database (".\Pokemon.Infrastructure\Data\Pokemon.db") provided Pokémon data does not exist already. 
     
  5. Launch a command prompt window & change to the directory, PokemonUI, type "code ." to open the UI code in Visual Studio Code. Run "npm install" to install node modules  & "npm start", to launch the client application at http://localhost:3000

  6. Login to the client application using the user name: "pokemon@yps.com" & password: "pokemon".

  7. Click on the left menu: "Pokemon" to list all Pokémon, which can be filtered by ID or name from the search text box.
