const Total = ({ parts }) => {
  return (
    <strong>
      <p>
        Number of exercises{" "}
        {parts.reduce((acc, part) => acc + part.exercises, 0)}
      </p>
    </strong>
  );
};

export default Total;
