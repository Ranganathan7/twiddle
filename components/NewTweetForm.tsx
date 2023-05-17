"use client";

import React, {
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Button from "./Button";
import ProfileImage from "./ProfileImage";
import { useSession } from "next-auth/react";

function updateTextAreaSize(textarea?: HTMLTextAreaElement) {
  if (!textarea) return;
  textarea.style.height = "0";
  textarea.style.height = `${textarea.scrollHeight}px`;
}

const NewTweetForm: React.FC = () => {
  const session = useSession();
  const [input, setInput] = useState<string>("");
  const textareaRef = useRef<HTMLTextAreaElement>();
  const inputRef = useCallback((textarea: HTMLTextAreaElement) => {
    updateTextAreaSize(textarea);
    textareaRef.current = textarea;
  }, []);

  useEffect(() => {
    updateTextAreaSize(textareaRef.current);
  }, [input]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const reqBody = {
      content: input.trim(),
      userId: session?.data?.user.id,
    };
    try {
      const response = await fetch("/api/tweets/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reqBody),
      });
      const responseBody = await response.json();
      if (responseBody.error) {
        throw responseBody;
      } else {
        //tweet created successfully
        setInput("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (session.status !== "authenticated") return <></>;

  return (
    <form
      className="flex flex-col gap-2 border-b px-4 py-2"
      onSubmit={handleSubmit}
    >
      <div className="flex gap-4">
        <ProfileImage src={session.data?.user?.image} className="" />
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          style={{ height: "0" }}
          className="flex-grow overflow-hidden resize-none p-4 text-lg outline-none"
          placeholder="What's happening?"
        />
      </div>
      <Button className="self-end" type="submit">
        Twiddle
      </Button>
    </form>
  );
};

export default NewTweetForm;
