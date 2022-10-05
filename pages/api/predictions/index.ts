import type { NextApiRequest, NextApiResponse } from "next";

<<<<<<< HEAD
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body.prompt)
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: 'Token 64e7a82766f9504caeaf83a48b17419e635b4f78',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version:
=======
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: "Token <PUT YOUR TOKEN HERE>",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version:
>>>>>>> f1000a289e63e4559d9f94fab7e7d472adb9c9d1
        "a9758cbfbd5f3c2094457d996681af52552901775aa2d6dd0b17fd15df959bef",
      input: { prompt: req.body.prompt },
    }),
  });

  if (response.status !== 201) {
    let error = await response.json();
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: error.detail }));
    return;
  }

  const prediction = await response.json();
  res.statusCode = 201;
  res.end(JSON.stringify(prediction));
}
