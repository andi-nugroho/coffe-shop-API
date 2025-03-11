import Users from '../models/user.js'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/** JWT TOKEN SECTION START **/
// Generate token
const generateToken = (user) => {
  const payload = {
    userId: user.id,
    username: user.username,
    email: user.email,
  };
// Expired token in
  const options = {
    expiresIn: '2h'
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options)
};
/** JWT TOKEN SECTION END **/

// Register user
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validate input if the column is empty
    if (!username || !email || !password){
      return res.status(400).json({ error: "Username, Email and Password are required" })
    }

    // Cek username
    const cekUsername = await Users.findOne({
      where: {
        username: username
      }
    });
    if(cekUsername){
      return res.status(400).json({ error: "Username already exists"});
    }
    
    // Cek email
    const cekEmail = await Users.findOne({
      where: {
        email: email
      }
    });
    if(cekEmail){
      return res.status(400).json({ error: "Email already exists"});
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 8);

    const newUser = await Users.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser)
    res.status(201).json({ msg: "Register Berhasil", user: newUser, token })
  
  } catch (error) {
    console.error('Error register user:', error)
    res.status(500).json({ msg: "Username atau Email sudah digunakan!" })
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validasi input
    if (!username || !password) {
      return res.status(400).json({ msg: "Username and password are required" })
    }

    // Cari User
    const user = await Users.findOne({
      where: {
        username: username
      },
    });

    if (!user) {
      return res.status(401).json({ msg: "Invalid Username or Password" });
    }

    // Matching Password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(!passwordMatch) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    const token = generateToken(user)
    res.status(200).json({ msg: "Login Berhasil", user: user, token });

  } catch (error) {
    console.error('Error logging in:', error)
    res.status(500).json({ error: "Internal server error!"})
  }
}

// Get All Users
export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll();
        res.json(users)
    } catch (error) {
        console.log(error)
        res.status(500).json({
          status: 500,
          msg: 'Internal Server Error',
          error: error.msg
        })
    }
}
