import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUserModel } from '../models/User.model';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "";

// Register a new user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      res.status(400).json({ message: 'Passwords do not match' });
      return;
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser: IUserModel = new User({
      firstName,
      lastName,
      email,
      passwordHash: hashedPassword,
      deleted: false,
      role: 'customer'
    });
    const savedUser = await newUser.save();

    // Create and sign JWT
    const token = jwt.sign({ id: savedUser._id, role: savedUser.role, email: savedUser.email }, JWT_SECRET_KEY);

    // Send response
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Log in an existing user
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Create and sign JWT
    const token = jwt.sign({ id: user._id, role: user.role, email: user.email }, JWT_SECRET_KEY, { expiresIn: '1h' });

    // Set JWT as a cookie
    res.cookie('jwt', token, { httpOnly: true, secure: false, sameSite: 'none', maxAge: 60 * 60 * 1000 }); // Expires after 1 hour

    // Send response
    res.status(200).json({ message: "User logged in successfully", token: token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user', error });
  }
};

// Logout user
export const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie('jwt');

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out", error });
  }
};

    // const token = req.headers.authorization?.split(" ")[1];

    // // Check if token exists
    // if (!token) {
    //   throw new Error("Unauthorized");
    // }

    // // Verify token
    // jwt.verify(token, JWT_SECRET_KEY);