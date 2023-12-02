import { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";
import { db } from "~/server/db";
import bcrypt from 'bcryptjs'
import { APIResponse } from "~/types/api";
import { LoginResponseData } from "~/types/next-auth";


const KEY = env.NEXTAUTH_SECRET as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<APIResponse<LoginResponseData>>,
) {
  const { method } = req;

  if (method !== 'POST') {
    res.status(400).json({
      status: 'error',
      message: 'Method not implemented',
    });
    return;
  }

  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      status: 'error',
      message: 'Request missing email or password',
    });
    return;
  }

  const user = await db.user.findUnique({
    where: { email }
  });

  if (!user) {
    res.status(401).json({
      status: 'error',
      message: 'User not found',
    });
    return;
  }

  const userId = user.id,
    userEmail = user.email,
    userPassword = user.password;

  const isMatch = await bcrypt.compare(password, userPassword);
  if (!isMatch) {
    res.status(400).json({
      status: 'error',
      message: 'Password incorrect',
    });
    return;
  }
  const payload = {
    id: userId,
    email: userEmail,
  };
  try {
    const token = 'jwt'
    res.status(200).json({
      status: 'success',
      message: 'User successfully logged in',
      data: {
        id: userId,
        email: userEmail,
        accessToken: token as string,
      },
    });
  } catch (e) {
    res.status(500).json({
      status: 'error',
      message: 'ERROR SIGN TOKEN',
    });
  }
  return;
}