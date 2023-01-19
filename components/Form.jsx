export default function Form(props) {
  const formHandler = (e) => {
    e.preventDefault();
  };
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        formHandler(e);
        props.onSubmit();
      }}
    >
      {props.children}
      <button
        type="submit"
        className="py-2 bg-cyan-500 text-white rounded-lg transition-all hover:bg-cyan-600"
      >
        Add Data
      </button>
    </form>
  );
}
