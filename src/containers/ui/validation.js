const Validation = ({ obj, fields }) => {
  const output = [];
  for (let [key, value] of Object.entries(obj)) {
    output.push(
      `${fields.find((f) => f.type === key)?.value}: ${value.join(",")}`
    );
  }
  return Object.entries(obj).map((o, index) => (
    <p className="mb-3" key={index}>
      <span style={{ color: "red", fontWeight: 800, fontSize: "1rem" }}>
        {fields.find((f) => f.type === o[0])?.value}:{" "}
      </span>
      <br />
      {o[1]}
    </p>
  ));
};

export default Validation;
