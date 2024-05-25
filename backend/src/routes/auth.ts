import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { User } from '../models/User';
import dotenv from "dotenv";

dotenv.config();

const router = Router();

router.post('/login', 
  body('username').isString(),
  body('password').isString(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, `${process.env.APP_SECRET}`, { expiresIn: '1d' });
    res.json({ token });
  }
);

export default router;
