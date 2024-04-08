// File: app/api/route.ts

import { tmpdir } from "os";
import type { NextRequest } from "next/server";

// Import FileStore, read and write tools
import { NodeFileStore } from "langchain/stores/file/node";
import { ReadFileTool, WriteFileTool } from "langchain/tools";

// Import SerpAPI LangChain tool
import { SerpAPI } from "@langchain/community/tools/serpapi";

// Import OpenAI LangChain embeddings generator
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";

// Import in-memory vector store
import { MemoryVectorStore } from "langchain/vectorstores/memory";

// Import AutoGPT
import { AutoGPT } from "langchain/experimental/autogpt";

// Exporting a constant to declare the endpoint as not a  static one
export const dynamic = "force-dynamic";

// Handling GET request
export async function GET(request: NextRequest) {
  // Extracting place and days from request query parameters
  const searchParams = request.nextUrl.searchParams;
  const place = searchParams.get("place");
  const days = searchParams.get("days");

  // If place or days are missing, return 500 status
  if (!place || !days) return new Response(null, { status: 500 });
  
  // Creating a NodeFileStore with temporary directory
  const store = new NodeFileStore(tmpdir());

  // Initializing tools array with necessary tools
  const tools = [
    new ReadFileTool({ store }),
    new WriteFileTool({ store }),
    new SerpAPI(process.env.SERPAPI_API_KEY, {
      location: "Bangalore, India",
      hl: "en",
      gl: "in",
    }),
  ];

  // Initializing vectorStore with OpenAIEmbeddings
  const vectorStore = new MemoryVectorStore(new OpenAIEmbeddings());

  // Initializing assistant object with configuration
  const assistant = {
    maxIterations: 2,
    aiRole: "Assistant",
    aiName: "Rishi Raj Jain",
    memory: vectorStore.asRetriever(),
  };

  // Initializing TextEncoder
  const encoder = new TextEncoder();
  
  // Creating a custom ReadableStream
  const customReadable = new ReadableStream({
    async start(controller) {
      // Initializing ChatOpenAI instance
      const llm = new ChatOpenAI({
        temperature: 0,
        streaming: true,
        callbacks: [
          {
            // Handling LLM end event
            handleLLMEnd(output) {
              const generations = JSON.parse(output.generations[0][0].text);
              // Enqueueing data to the controller
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify(generations)}\n\n`)
              );
            },
          },
        ],
      });

      // Initializing AutoGPT instance with llm, tools, and assistant
      const autogpt = AutoGPT.fromLLMAndTools(llm, tools, assistant);

      // Running AutoGPT with a specific command
      await autogpt.run([
        `write an itinerary for a trip to ${place} for ${days} days`,
      ]);

      // Closing the controller
      controller.close();
    },
  });

  // Returning a Response with the custom ReadableStream and necessary headers
  return new Response(customReadable, {
    headers: {
      Connection: "keep-alive",
      "Content-Encoding": "none",
      "Cache-Control": "no-cache, no-transform",
      "Content-Type": "text/event-stream; charset=utf-8",
    },
  });
}
