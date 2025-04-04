interface QnAItem {
  question: string;
  answer: string;
}

interface Review {
  author: string;
  comments: string;
}

interface QnAProps {
  qna: QnAItem[];
  review: Review[];
}
export default function QnA({ qna, review }: QnAProps) {
  return (
    <div className="mt-8 flex w-full">
      <div className="w-[45%]">
        <h2 className="font-semibold text-[20px] mb-4">Questions asked:</h2>
        {qna.length > 0 ? (
          qna?.map((item, index) => (
            <div key={index} className="p-2 break-words">
              <li className="font-medium">{item.question}</li>
              <li style={{ listStyle: "none" }} className="indent-5">
                {item.answer}
              </li>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No questions asked yet.</p>
        )}
      </div>
      <div className="w-[45%]">
        <h2 className="font-semibold text-[20px] mb-4">Reviews:</h2>
        {review.length > 0 ? (
          review?.map((item, index) => (
            <div key={index} className="p-2 break-words">
              <li className="font-medium">{item.author}</li>
              <li style={{ listStyle: "none" }} className="indent-5">
                {item.comments}
              </li>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No questions asked yet.</p>
        )}
      </div>
    </div>
  );
}
