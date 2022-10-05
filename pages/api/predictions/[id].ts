import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch(
    "https://api.replicate.com/v1/predictions/" + req.query.id,
    {
      headers: {
<<<<<<< HEAD
        Authorization: 'Token 64e7a82766f9504caeaf83a48b17419e635b4f78',
=======
        Authorization: "Token <PUT YOUR TOKEN HERE>",
>>>>>>> f1000a289e63e4559d9f94fab7e7d472adb9c9d1
        "Content-Type": "application/json",
      },
    }
  );
  if (response.status !== 200) {
    let error = await response.json();
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: error.detail }));
    return;
  }

  const prediction = await response.json();
  res.end(JSON.stringify(prediction));
}
