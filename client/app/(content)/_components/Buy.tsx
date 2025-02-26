export default function Buy({ productId }: { productId: string }) {
  return (
    <button key={productId} className="w-full bg-red-400 py-1 px-2 rounded-md">
      Buy
    </button>
  );
}
