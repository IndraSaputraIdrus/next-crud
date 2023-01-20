export default function FormButton(props) {
  return (
    <button
      type="submit"
      className="border-2 border-white p-3 uppercase font-bold duration-300 hover:bg-white hover:text-slate-800"
    >
      {props.children}
    </button>
  );
}
