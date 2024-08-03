// Imports
    import express from "express"
    import { getUsers, addUser, updateUser, deleteUser } from "../controllers/users.js"

// Configuring routes
    const router = express.Router()

// Routes
    router.get("/", getUsers)
    router.post("/", addUser)
    router.put("/:id", updateUser)
    router.delete("/:id", deleteUser)

// Exporting routes
    export default router
