import { Loader } from "lucide-react";

export default function AnimateLoader({ size, color }) {
  return (
    <div className="flex justify-center items-center">
      <Loader color={color} className="animate-spin" size={size} />
    </div>
  );
}
