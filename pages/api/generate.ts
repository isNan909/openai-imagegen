// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi} from "openai";

type ResponseData = {
  url: string | undefined;
}
interface GenerateRequest extends NextApiRequest{
  body:{
    prompt: string;
    n: number;
    size: string;
  }
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

export default async function handler(
  req: GenerateRequest,
  res: NextApiResponse<ResponseData>
) {
  const promptString = req.body.prompt;
  if(!promptString || undefined) {
    return new Response('you need a prompt', { status: 400 })
  }
  const aiResponse = await openai.createImage({
    prompt: `${promptString}`,
    n: 1,
    size: "512x512",
  });
  const imageUrl = aiResponse.data.data[0].url;
  res.status(200).json({ url: imageUrl })
}
