import React, { useState } from "react";
import ReactAutoSuggest from "components/common/ReactAutoSuggest";
import cakes from "data/cakes";

const data = cakes.map((item) => {
  return { name: item.title };
});

const ReactAutoSugegstExample = ({ intl }) => {
  const [value, setValue] = useState("");
  const { messages } = intl;

  return (
    <ReactAutoSuggest
      placeholder="Type a Cake"
      value={value}
      onChange={(val) => setValue(val)}
      data={data}
    />
  );
};

export default ReactAutoSugegstExample;
