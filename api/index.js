// Imports
    import express from "express"
    import cors from "cors"

    import userRoutes from "./routes/users.js"

// Initialization express
    const app = express()

// Configuração para usar json
    app.use(express.json())
    app.use(cors())

// Routes
    app.use("/", userRoutes)

// Sever
    app.listen(8800)