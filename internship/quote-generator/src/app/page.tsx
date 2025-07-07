import React from "react";
import { TopicQuoteForm } from "../components/TopicQuoteForm";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-base-200 via-base-100 to-base-300 transition-all duration-500">
      <TopicQuoteForm />
    </div>
  );
}
