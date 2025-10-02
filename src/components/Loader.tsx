import { Home } from "lucide-react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/25 backdrop-blur-xs">
      <div className="relative z-10 flex flex-col items-center space-y-4 animate-bounce">
        <div className="w-36 h-36 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg animate-pulse">
          <Home className="w-24 h-24 text-white" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
