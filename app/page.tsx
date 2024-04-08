"use client";

// Importing useState hook from React
import { useState } from "react";

// Importing components from the UI library
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Default function component
export default function () {
  // State variables for selected days and place
  const [days, setDays] = useState<string>();
  const [place, setPlace] = useState<string>();
  const [messages, setMessages] = useState<any[]>([]);

  // Function to connect to the server and receive messages
  const connectToStream = (days: string, place: string) => {
    // Creating a new EventSource for server-sent events (SSE)
    const eventSource = new EventSource(`/api?place=${place}&days=${days}`);
    // Event listener for receiving messages
    eventSource.addEventListener("message", (event) => {
      // Parsing the JSON data received from the server
      const tmp = JSON.parse(event.data);
      // Updating the messages state with the new message
      setMessages((messages) => [...messages, tmp]);
      // If it outputs the trip, close the stream.
      if (tmp.command.name === "write_file") eventSource.close();
    });
  };

  // Function to trigger planning based on selected days and place
  const plan = () => days && place && connectToStream(days, place);
  // Rendered JSX
  return (
    <>
      {/* Title */}
      <h1 className="text-xl font-semibold">Trip Planner</h1>
      {/* Select inputs for choosing place and days */}
      <div className="mt-3 flex flex-row gap-x-3 items-center">
        {/* Select for choosing place */}
        <Select onValueChange={setPlace}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Place" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Delhi">Delhi</SelectItem>
            <SelectItem value="Bangalore">Bangalore</SelectItem>
            <SelectItem value="Hyderabad">Hyderabad</SelectItem>
          </SelectContent>
        </Select>
        {/* Select for choosing days */}
        <Select onValueChange={setDays}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Days" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="6">6</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Button to trigger planning */}
      <Button
      className="mt-3 max-w-max"
      onClick={plan}
      >
        Plan &rarr;
      </Button>
      {/* Displaying messages received from the server */}
      {messages.map((i, _) => (
        <div
          key={_}
          className="mt-3 border-t border-black flex flex-col items-start text-left"
        >
          {/* Displaying action */}
          <span className="border-b w-full mt-3 font-medium text-blue-600">
            Action
          </span>
          <span className="mt-3">{i.thoughts.speak}</span>
          {/* Displaying reasoning */}
          <span className="border-b w-full mt-3 font-medium text-orange-600">
            Why?
          </span>
          <span className="mt-3">{i.thoughts.reasoning}</span>
          {/* Displaying next steps */}
          <span className="border-b w-full mt-3 font-medium text-purple-600">
            Next Steps
          </span>
          <div className="w-full h-[1px] mt-3" />
          {/* Displaying each next step */}
          {i.thoughts.plan.map((j: string) => (
            <div key={j}>- {j}</div>
          ))}
          {/* Displaying trip details if command is to write a file */}
          {i.command.name === "write_file" && (
            <>
              <span className="border-b w-full mt-3 font-medium text-green-600">
                Your Trip
              </span>
              <span className="mt-3 whitespace-pre">{i.command.args.text}</span>
            </>
          )}
        </div>
      ))}
    </>
  );
}
