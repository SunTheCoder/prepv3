import express, { Request, Response, NextFunction } from "express"
import { JwtPayload } from "jsonwebtoken"; // ✅ Import JwtPayload
import bcrypt from "bcryptjs"
import JWT from "jsonwebtoken"
import User from "../models/user"


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

        const token = JWT.sign({ id: user.id}, process.env.JWT_SECRET as string, { expiresIn: "1h" })

        res.cookie("token", token, {httpOnly: true, secure: true, sameSite: "strict"})
        res.status(200).json({message: "Logged in successfully", token})


    } catch (error) { 
        next(error)
    }
})

router.post("/logout", (req: Request, res: Response) => {
    res.clearCookie("token", { httpOnly: true, sameSite: "strict", secure: true });
    res.json({ message: "Logged out successfully!" });
});

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

router.get("/auth", async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ error: "Not authenticated" });
            return;
        }

        // ✅ Decode token and explicitly type it as JwtPayload
        const decoded = JWT.verify(token, process.env.JWT_SECRET!) as JwtPayload;

        console.log("Decoded Token:", decoded); // ✅ Debugging

        if (!decoded.id) { // ✅ Ensure id exists
            res.status(401).json({ error: "Invalid token payload" });
            return;
        }

        // ✅ Fix TypeScript error by ensuring `id` is always a string
        const user = await User.findByPk(decoded.id, { attributes: ["id", "name", "username", "email"] });

        if (!user) {
            res.status(401).json({ error: "User not found" });
            return;
        }

        res.json(user);
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({ error: "Invalid token" });
    }
});


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