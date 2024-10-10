export default function Loading() {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-success bg-opacity-10">
        <div className="relative">
          <div className="w-24 h-24 rounded-full animate-spin border-y-4 border-solid border-success border-t-transparent shadow-md"></div>
          <div className="w-24 h-24 rounded-full  border-y-4 border-solid border-success border-b-transparent shadow-md absolute top-0 left-0 animate-[spin_3s_linear_infinite]"></div>
          <div className="w-24 h-24 rounded-full  border-y-4 border-solid border-success border-t-transparent shadow-md absolute top-0 left-0 animate-[spin_1.5s_linear_infinite]"></div>
        </div>
        <div className="mt-4 text-success text-2xl font-bold">Loading</div>
        <div className="mt-2 flex space-x-2">
          <div className="w-3 h-3 bg-success rounded-full animate-[pulse_1.5s_ease-in-out_infinite]"></div>
          <div className="w-3 h-3 bg-success rounded-full animate-[pulse_1.5s_ease-in-out_0.3s_infinite]"></div>
          <div className="w-3 h-3 bg-success rounded-full animate-[pulse_1.5s_ease-in-out_0.6s_infinite]"></div>
        </div>
      </div>
    )
  }