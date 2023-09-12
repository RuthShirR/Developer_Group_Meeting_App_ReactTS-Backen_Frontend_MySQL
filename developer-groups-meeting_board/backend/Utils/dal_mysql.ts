import mysql from "mysql";
import config from "./Config";

// =================================
// DAL MYSQL
// =================================

const connection = mysql.createPool({
    host: config.mySQLhost,
    user: config.mySQLuser,
    password: config.mySQLpass,
    database: config.mySQLdatabase,
});

// Execute SQL query function
const execute = (sql: string): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
     
        connection.query(sql, (err, res) => {
            if (err) {
                reject(err);
                return;
            }

         
            resolve(res);
        });
    });
}

export default {
    execute
}