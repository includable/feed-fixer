"use client";

import React, { useState } from "react";
import {
  ClipboardDocumentListIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/20/solid";

const CopyableText = ({ text }) => {
  const [copied, setCopied] = useState(false);

  return (
    <pre className="flex justify-between mb-0 bg-gray-800">
      <code>{text}</code>
      <button
        onClick={() => {
          setCopied(true);
          navigator.clipboard.writeText(text);
        }}
      >
        {copied ? (
          <ClipboardDocumentCheckIcon className="w-5 h-5 text-white" />
        ) : (
          <ClipboardDocumentListIcon className="w-5 h-5" />
        )}
      </button>
    </pre>
  );
};

export default CopyableText;
