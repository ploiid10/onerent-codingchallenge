module.exports = {
   port : process.env.PORT || 4000,
   db : { 
       name : process.env.DB_SCHEMAS || 'codingchallenge',
       username : 'postgres',
       password :'postgres',
       host : 'localhost',
       dialect : 'postgres'
   } 
}