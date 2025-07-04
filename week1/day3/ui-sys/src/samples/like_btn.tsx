import { useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

const LikeBtn = () => {
  const [liked, setLiked] = useState(false);

  return (
    <button className="flex flex-row items-center" onClick={() => setLiked(!liked)}>
      {liked ? <AiFillLike /> : <AiOutlineLike />}
      <span className="ml-2">
        {liked ? "Thank you!" : "Click like if this post is useful to you !"}
      </span>
    </button>
  );
};

export default LikeBtn;
