"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

const PromptCard = ({ post, handleTagClick, handleDelete, handleEdit }) => {
  const [copied, setCopied] = useState("");
  // console.log("post", post);
  const handleCopy = () => {
    setCopied(post?.prompt);
    navigator.clipboard.writeText(post?.prompt);
    setTimeout(() => setCopied(""), 3000);
  };
  // console.log("copied", copied);
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex flex-1 justify-between items-start gap-3 cursor-pointer">
          <Image
            src={post?.creator?.image}
            height={40}
            width={40}
            alt="profile_pic"
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post?.creator?.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post?.creator?.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post?.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={12}
            height={12}
            alt="cta_icon"
          />
        </div>
      </div>
      <p className="text-sm font-satoshi my-4 text-gray-700">{post?.prompt}</p>
      <p
        className="text-sm font-inter blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post?.tag)}
      >
        {post?.tag}
      </p>
    </div>
  );
};

export default PromptCard;
