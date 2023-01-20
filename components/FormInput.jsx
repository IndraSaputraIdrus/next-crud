export default function FormInput(props) {
  return (
    <input
      placeholder={props.placeholder}
      className="outline-none text-slate-800 p-3 font-semibold focus:outline-white"
      value={props.value}
      onChange={props.onChange}
      type={props.type || "text"}
    />
  );
}
