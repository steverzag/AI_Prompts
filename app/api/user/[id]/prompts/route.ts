import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({
      creator: params.id,
    }).populate("creator");

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("Posts could not be fetched for this user.", {
      status: 500,
    });
  }
};
