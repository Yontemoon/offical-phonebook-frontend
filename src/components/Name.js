export const Name = ({ name, deleteName }) => {
  return (
    <>
      <p>Name: {name.name} --- Number: {name.number} --- <button onClick={deleteName}>DELETE</button></p>
    </>
  );
};
