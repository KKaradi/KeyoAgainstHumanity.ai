import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body.prompt)
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: 'Token <PutInToken>',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version:
        "a9758cbfbd5f3c2094457d996681af52552901775aa2d6dd0b17fd15df959bef",
        input: { prompt: req.body.prompt},
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