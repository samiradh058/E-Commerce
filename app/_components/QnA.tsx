interface QnAItem {
  Question: string;
  Answer: string;
}

interface QnAProps {
  qna: QnAItem[];
}
export default function QnA({ qna }: QnAProps) {
  return (
    <div className="mt-8 w-full">
      <h2 className="font-semibold text-[20px] mb-4">
        Questions asked related to this product:
      </h2>
      {qna.map((item, index) => (
        <div key={index} className="p-2 break-words">
          <li className="font-medium">{item.Question}</li>
          <li style={{ listStyle: "none" }} className="indent-5">
            {item.Answer}
          </li>
        </div>
      ))}
    </div>
  );
}
