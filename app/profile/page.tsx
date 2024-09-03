"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { PromptType } from "@app-types/PromptType";

const MyProflile = () => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([] as PromptType[]);
  const router = useRouter();

  const handleEdit = async (post: PromptType) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: PromptType) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        }).then(() => {
          console.log("thennnnn")
          const filteredPosts = posts.filter((val) => val._id !== post._id);
          setPosts(filteredPosts);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/user/${session?.user.id}/prompts`);
      const data = await response.json();

      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, [session]);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    ></Profile>
  );
};

export default MyProflile;
