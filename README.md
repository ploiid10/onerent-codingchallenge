# codingchallenge

For the backend, We're going to implement a Node + Express web server that exposes a GraphQL API.
Implement a database with two models, Users and Properties. (We use postgres + sequelize, but you can choose whatever you're most comfortable with)

The models would look something like:

User
- id (string) - "5592d311d7c6770300911b65"
- firstName (String) - "John"
- lastName (String) - "Smith"

Property
- id (string) - "5592d311d7c6770300911b65"
- street (string) - "505 South Market St"
- city (string) - "San Jose"
- state (string) - "CA"
- zip (string) - "95008"
- rent (number) - 3500

A user can have many properties.

The API will only have a single GraphQL end point.

query search()

which should return users and/or properties that match the search string.
if the result contains a user, the users properties must also be shown for the results.

On the frontend, build a single page app which will show a text input and a submit button. Once the submit button is clicked, it will then send an asynchronous request to your GraphQL server and do the search based on the string input. Finally, display the result (properties) in list format.
(We use ReactJS and Redux + Apollo, but feel free to use any library)


# Instruction to run
- go to client directory
1. run npm install
- go to server directory
1. run npm install
2. create database with a name "codingchallenge" or any(define databasename in server/config/config.json)
3. npx sequelize db:migrate to create tables
4. npx seqeulize db:seed:all to generate datas in table
5. run npm run dev to launch the client and server