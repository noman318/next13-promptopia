import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    params?.id;
    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );
    // console.log("prompts", prompts);
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log("Error in Get User Post route", error);
    return new Response("Failed to fetch Prompts of this User", {
      status: 500,
    });
  }
};
