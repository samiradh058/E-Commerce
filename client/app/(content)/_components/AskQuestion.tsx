"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AskQuestion({ productId }: { productId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  async function handleSubmit() {
    if (!question.trim()) {
      setError("Question cannot be empty");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8080/product/qna", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, question }),
      });

      if (response.ok) {
        setQuestion("");
        setIsOpen(false);
      } else {
        setError("Failed to submit question");
      }
    } catch (error) {
      console.error("Error submitting question", error);
      setError("An error occurred");
    } finally {
      setLoading(false);
      router.refresh();
    }
  }

  return (
    <>
      <button
        className="w-full bg-green-400 py-1 px-2 rounded-md"
        onClick={() => setIsOpen(true)}
      >
        Ask Question
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
            <h2 className="text-lg font-semibold mb-2">Ask a Question</h2>
            <textarea
              className="w-full border rounded-md p-2"
              rows={3}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question..."
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md"
                onClick={() => {
                  setIsOpen(false);
                  setError("");
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-md"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
