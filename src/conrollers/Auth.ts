import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User, { IUserModel } from '../models/User';

// Register a new user
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
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
    const token = jwt.sign({ id: savedUser._id, role: savedUser.role, email: savedUser.email }, process.env.JWT_SECRET_KEY as string);

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
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string);

    // Send response
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user', error });
  }
};
