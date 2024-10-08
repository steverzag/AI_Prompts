"use client"

import { Post } from "@app-types/Post";
import Form from "@components/Form";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FormEvent, Suspense, useEffect, useState } from "react";

const UpdatePromptElement = () => {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({} as Post);
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const updatePrompt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch(`api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    const getPromptDetails = async () => {
        const response = await fetch(`api/prompt/${promptId}`);
        const data = await response.json();
        setPost(data);
    };

    if(promptId)
        getPromptDetails();
  }, [promptId]);
  return (
    <Form
      type="Update"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    ></Form>
  );
};

const UpdatePrompt = () => {
    return <Suspense><UpdatePromptElement/></Suspense>
}

export default UpdatePrompt;
