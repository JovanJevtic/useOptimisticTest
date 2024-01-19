import { useFormStatus } from "react-dom";

const AddButton = () => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Submit
    </button>
  );
};

export default AddButton;
