import { RegisterUser, User } from "../../types/user";
import  db  from "../../db.js";
import { generateToken } from "../../utils/jwt.js";
import  bcrypt  from "bcrypt";

//TODO: Maybe type req and res?
export async function register(req: any, res: any) {
    console.log("[SERVER] Trying to register user...");
    const user: RegisterUser = req.body;
  
    if (!user.email || !user.password || !user.username) {
      res.status(400).send("Missing Information");
      return
    }
  
    try {
    const { rows: emailExists } = await db.query(
      "SELECT * FROM users WHERE email = $1", 
      [user.email] 
    );
  
    if (emailExists.length > 0) {
      console.log(emailExists[0])
      res.status(400).send("Email already exists");
      return
    }
  
    const { rows: userNameExsists } = await db.query(
      "SELECT * FROM users where username = $1", 
      [user.username]
    );
    if (userNameExsists.length > 0) {
      console.log(userNameExsists[0])
      res.status(400).send("Username already exists");
      return
    }
  
    const hashedPassword = await bcrypt.hash(user.password, 12);
    const { rows: createdUser } = await db.query(
      `INSERT INTO users (username, password_hash, email, rank, "createdat", lastlogin) 
       VALUES ($1, $2, $3, $4, Now(), Now()) 
       RETURNING *`,
      [user.username, hashedPassword, user.email, 0]
    );    
    const { password_hash, ...userWithoutPassword } = createdUser[0];
    res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
      return
    } 
  };
  
export async function login (req: any, res: any) {
    const { username, password } = req.body;
    const result = await db.query(
      'SELECT user_id, username, email, password_hash FROM public.users WHERE username = $1',
      [username]
    );
    const foundUser: User = result.rows[0];
    console.log("FOUND USER: " + foundUser.user_id + " " + foundUser.username + " " + foundUser.password_hash )
    const passwordMatches: boolean  = await bcrypt.compare(password, foundUser.password_hash)
    
    if(!passwordMatches){
      res.status(401).send("Invalid credentials")
      return
    }
    const token = generateToken(foundUser);
    res.send(JSON.stringify(token))
  }