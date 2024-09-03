import { PromptType } from "@app-types/PromptType";
import PromptCard from "./PromptCard";

type Props = {
  name: string;
  desc: string;
  data: PromptType[];
  handleEdit: (post: PromptType) => void;
  handleDelete: (post: PromptType) => void;
};
const Profile = ({ name, desc, data, handleEdit, handleDelete }: Props) => {
  return (
    <section className="w-full">
      <h1 className="head_text">
        <span className="blue_gradient">{name} Profile</span>
      </h1>
      <p className="desc text-left">{desc}</p>
      <div className="mt-16 prompt_layout">
        {data.map((p) => (
          <PromptCard
            key={`post-${p._id}`}
            post={p}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          ></PromptCard>
        ))}
      </div>
    </section>
  );
};

export default Profile;
