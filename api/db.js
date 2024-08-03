// Import MySQL
    import mysql from "mysql"

// Connection with database
    export const db = mysql.createConnection(
        {
            host: "localhost",
            user: "root",
            password: "",
            database: "crud"
        }
    )