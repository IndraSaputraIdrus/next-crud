export default function Form(props) {
  const formHandler = (e) => {
    e.preventDefault();
  };
  return (
    <form
      className="w-full max-w-[300px] flex flex-col gap-3 sm:gap-4"
      onSubmit={(e) => {
        formHandler(e);
        props.onSubmit();
      }}
    >
      {props.children}
    </form>
  );
}
