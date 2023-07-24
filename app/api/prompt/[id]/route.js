import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";

export const GET = async (req, { params }) => {
  //   console.log("params", params);
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response("No prompt with this ID found", { status: 404 });
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log("Error in Create Post route", error);
    return new Response("Failed to fetch Prompt by ID", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    const exisitingPrompt = await Prompt.findById(params.id);
    if (!exisitingPrompt) {
      return new Response("No prompt with this ID found", { status: 404 });
    }
    exisitingPrompt.prompt = prompt;
    exisitingPrompt.tag = tag;
    await exisitingPrompt.save();
    return new Response(JSON.stringify(exisitingPrompt), { status: 201 });
  } catch (error) {
    console.log("Error in Patch route", error);
  }
};

export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);
    return new Response("Deleted prompt successfully", { status: 200 });
  } catch (error) {
    console.log("Error in Delete route", error);
    return new Response("Failed to Delete Prompt", { status: 500 });
  }
};
