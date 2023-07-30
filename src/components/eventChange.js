export function eventChange(setNewName) {
  return (event) => {
    setNewName(event.target.value);
  };
}
