interface QnAItem {
  Question: string;
  Answer: string;
}

interface QnAProps {
  qna: QnAItem[];
}
export default function QnA({ qna }: QnAProps) {
  return (
    <div className="mt-8">
      <h2 className="font-semibold text-[20px] mb-4">
        Questions asked related to this product:
      </h2>
      {qna.map((item, index) => (
        <div key={index} className="p-2 bg-stone-300 w-[700px] break-words">
          <p className="font-medium">{item.Question}</p>
          <p>{item.Answer}</p>
        </div>
      ))}
    </div>
  );
}
