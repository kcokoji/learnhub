import { HashLoader } from "react-spinners";

export default function Loader({ size, color }) {
  return (
    <div className="flex justify-center items-center z-50">
      <HashLoader
        color={color}
        speedMultiplier={2}
        aria-label="Loading Spinner"
        size={size}
        loading={true}
      />
    </div>
  );
}
