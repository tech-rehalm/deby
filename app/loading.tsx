import { Loader } from "lucide-react";

export default function Loading() {
    return (
      <div className="flex flex-col items-center justify-center h-screen gray-800 ">
       <Loader className="w-10 h-10 animate-spin text-success"/>
      </div>
    )
  }