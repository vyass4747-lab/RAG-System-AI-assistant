import ChatBox from "./components/ChatBox";
import FileUpload from "./components/Upload";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 flex items-center justify-center px-4 py-8">
      
      <div className="w-full max-w-4xl">
        
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 
          bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500 
          bg-clip-text text-transparent">
          AI Document Assistant
        </h1>

        <FileUpload />
        <ChatBox />

      </div>
    </div>
  );
}

export default App;