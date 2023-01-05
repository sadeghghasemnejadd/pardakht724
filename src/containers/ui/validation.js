const validation = (obj) => {
  const output = [];
  for (let [value, key] of Object.entries(obj)) {
    output.push(`${key}:${value.join(",")}`);
  }
  return output.join("\n");
};

export default validation;
