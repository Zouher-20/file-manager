import { NextApiRequest, NextApiResponse } from "next";
import { APIResponse } from "~/types/api";
import bcrypt from 'bcryptjs'
import { db } from "~/server/db";

type RegisterResponseData = {
    id: string;
  };
  
  export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<APIResponse<RegisterResponseData>>,
  ) {
    const { method } = req;
    if (method !== 'POST') {
      res.status(405).json({
        status: 'error',
        message: 'Request method not allowed',
      });
      return;
    }
    const { username, password, email, confirmPassword } = req.body;
  
    // check if password and confirm password match
    if (password !== confirmPassword) {
      res.status(400).json({
        status: 'error',
        message: 'Confirmation password not match',
      });
      return;
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const user = await db.user.create({
        data: {
          email: email,
          password: hashedPassword,
        },
      });
  
      res.status(201).json({
        status: 'success',
        message: 'Accound created successfully',
        data: {
          id: user.id,
        },
      });
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: 'Username or email is already used',
      });
    }
    return;
  }