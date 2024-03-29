import React, { useState } from "react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

const TagsInputExample = ({ intl }) => {
  const [tags, setTags] = useState([]);
  const { messages } = intl;

  return (
    <TagsInput
      value={tags}
      onChange={setTags}
      inputProps={{ placeholder: "Tags" }}
    />
  );
};
export default TagsInputExample;
