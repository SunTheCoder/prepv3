import express, { Request, Response, NextFunction } from "express"
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"
import User from "../models/user"
import { error } from "console"


const router = express.Router()

router.post("/signup", async (req: Request, res: Response, next: NextFunction ): Promise<void> => {
    try { 
        const { name, username, email, password } = req.body

        if (!name || !username || !email || !password) {
            res.status(400).json({error: "All fields required."});
            return;
        }

        const hashedpassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            username,
            email,
            password: hashedpassword
        })

        res.status(200).json({message: "User has been successfully created."})

    } catch (error) {
        next(error)
    }

})

router.post("/login", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

        const { username, password } = req.body;
        
        if (!username || !password) {
            res.status(400).json({error: "All fields required."});
            return;
        }

        const user = await User.findOne({ where: { username }})

        if (!user) {
            res.status(404).json({message: "User not found."})
            return;
        }

        const isValidPassword = bcrypt.compare(password, user.password)

        if (!isValidPassword) {
            res.status(400).json({mesasge: "Invalid Credentials"})
            return;
        }

        const token = JWT.sign({ is: user.id}, process.env.JWT_SECRET as string, { expiresIn: "1h" })

        res.cookie("token", token, {httpOnly: true, secure: true, sameSite: "strict"})
        res.status(200).json({message: "Logged in successfully", token})


    } catch (error) { 
        next(error)
    }
})

router.get("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users = await User.findAll()

        if (!users) {
            res.status(404).json({message: "Users not found."})
            return;
        }
        console.log("Users found: ", users)
        
        res.json(users)
    } catch (error) {
        next(error)
    }
})

router.get("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params

        if (!id) {
            res.status(400).json({message: "Bad Requst: No id found in params."})
            return;
        }

        const user = await User.findOne({ where: {id}})

        if (!user) {
            res.status(404).json({message: "User not found."})
            return;
        }

        res.json(user)

    } catch (error) {
        next(error)
    }
})

router.put("/id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, username, bio } = req.body
        const { id } = req.params

        if (!id) {
            res.status(400).json({message: "Bad Requst: No id found in params."})
            return;
        }

        const user = await User.findOne({ where: {id}})

        if (!user) {
            res.status(404).json({message: "User not found."})
            return;
        }

        await user.update({
            bio,
            name,
            username
        })

        res.json({message: "User updated successfully.", user})

    } catch (error) {
        
        next(error)

    }
})

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {

    try {
    const { id } = req.params

    if (!id) {
        res.status(400).json({message: "Bad Requst: No id found in params."})
        return;
    }

    const user = await User.findOne({ where: {id}})
    
    if (!user) {
        res.status(404).json({message: "User not found."})
        return;
    }
    
    await user.destroy()

    res.json({message: "User deleted successfully."})

    } catch (error) {

        console.error({error})
        
    }

})

export default router