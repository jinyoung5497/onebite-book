import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = new Date();
  res.status(200).json({ time: data.toLocaleString() });
}
