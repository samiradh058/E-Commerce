import { ImCross } from "react-icons/im";

export default function DeleteCartItem({ onDelete }: { onDelete: () => void }) {
  return (
    <button
      onClick={onDelete}
      className="col-span-1 text-lg font-medium text-red-500"
    >
      <ImCross />
    </button>
  );
}
