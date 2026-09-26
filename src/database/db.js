import pg from 'pg';
import dotenv from "dotenv";


//To use Pool instead of pg.Pool
const {Pool}=pg;


/*
load and store values in proccess , this is CommonJS
   require -> load 
   config -> read the .env and load the variables to process.env
*/ 
dotenv.config();


const pool = new Pool(
    {
        // all needed data will extract from DB_URL
        connectionString:process.env.DB_URL,
        max:10
    }
);


export default pool;
// pool.query("SELECT NOW()")
// .then(result =>{
//     console.log("Connection created succefully !");
//     console.log(result.rows);
// })
// .catch(error =>{
//     console.log("Connection failed");
//     console.log(error.message);
// })


