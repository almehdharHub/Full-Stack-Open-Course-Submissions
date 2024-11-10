const Part = ({ id, part, exercises }) => {
  return (
    <p key={id}>
      {part} {exercises}
    </p>
  );
};

export default Part;
