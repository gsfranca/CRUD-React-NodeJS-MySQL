// Importing database
    import { db } from "../db.js"

// (READ / GET) Use a query to try take the data on database and return a json with 200 status if successful
    export const getUsers = (_, res) =>
    {
        const query = "SELECT * FROM usuarios"

        db.query(query, (error, data) => 
        {
            try 
            {
                return res.status(200).json(data)
            } 
            catch (error) 
            {
                return res.json(error);
            }
        })
    }

// (CREATE / POST) Use a query to add a new user to database and return a json with 200 status if successful
    export const addUser = (req, res) =>
    {
        const query = "INSERT INTO usuarios(`nome`, `email`, `fone`, `data_nascimento`) VALUES (?)"

        const values = [
            req.body.nome,
            req.body.email,
            req.body.fone,
            req.body.data_nascimento,
        ]

        db.query(query, [values], error => 
        {
            try 
            {
                return res.status(200).json("Usuario criado com sucesso.")
            } 
            catch (error) 
            {
                return res.json(error);
            }
        })
    }

// (UPDATE / PUT) Use a query to update a user to database and return a json with 200 status if successful
    export const updateUser = (req, res) =>
    {
        const query = "UPDATE usuarios SET `nome` = ? , `email` = ?, `fone` = ?, `data_nascimento` = ? WHERE `id` = ?"

        const values = [
            req.body.nome,
            req.body.email,
            req.body.fone,
            req.body.data_nascimento,
        ]
        db.query(query, [...values, req.params.id], (error) => 
        {
            try 
            {
                return res.status(200).json("Usuario atualizado com sucesso.")
            } 
            catch (error) 
            {
                return res.json(error);
            }
        })
    }

// (DELETE / DELETE) Use a query to delete a data on database and return a json with 200 status if successful
    export const deleteUser = (req, res) =>
    {
        const query = "DELETE FROM usuarios WHERE `id` = ?"

        db.query(query, [req.params.id], (error) => 
        {
            try 
            {
                return res.status(200).json("Usuario deletado com sucesso.")
            } 
            catch (error) 
            {
                return res.json(error);
            }
        })
    }