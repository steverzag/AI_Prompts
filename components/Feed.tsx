"use client";
import { useState, useEffect, ChangeEvent } from "react";
import PromptCard from "./PromptCard";
import { PromptType } from "@app-types/PromptType";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([] as PromptType[]);

  function handleSearchChange(e: ChangeEvent<HTMLInputElement>): void {
    setSearchText(e.target.value);
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-fill flex-center">
        <input
          type="text"
          className="search_input peer"
          value={searchText}
          onChange={handleSearchChange}
        />
      </form>

      <PromptCardList data={posts} handleTagClick={() => {}}></PromptCardList>
    </section>
  );
};

export default Feed;

type PromptCardListProps = {
  data: PromptType[];
  handleTagClick: (tag: string) => void;
};
const PromptCardList = ({ data, handleTagClick }: PromptCardListProps) => (
  <div className="mt-16 prompt_layout">
    {data.map((p) => (
      <PromptCard 
      key={`post-${p._id}`}
      post={p}
      handleTagClick={handleTagClick}>

      </PromptCard>
    ))}
    </div>
);
