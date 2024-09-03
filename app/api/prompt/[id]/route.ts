import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt)
      return new Response("Prompt could not be found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Prompt could not be fetched", { status: 500 });
  }
};

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response("Prompt could not be found", { status: 404 });

    const { prompt, tag } = await req.json();
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Prompt could not be fetched", { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    await connectToDB();
    console.log("aa", params)
    await Prompt.findByIdAndDelete(params.id);
    return new Response("Prompt deleted", { status: 200 });
  } catch(error) {
    console.log(error)
    return new Response("There was an error trying to delete the prompt", {
      status: 500,
    });
  }
};
