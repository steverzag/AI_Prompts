import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (req: Request) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");
    console.log("prompts", prompts)
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log("/////////////////////////////////////////")
    console.log(error);
    return new Response("Prompts could not be fetched", { status: 500 });
  }
};
