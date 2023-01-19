export default function FormInput(props) {
  return (
    <input
      placeholder={props.placeholder}
      className="px-3 py-2 border border-slate-800"
      value={props.value}
      onChange={props.onChange}
      type={props.type || "text"}
    />
  );
}
