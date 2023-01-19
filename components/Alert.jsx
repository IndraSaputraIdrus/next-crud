export default function Alert(props) {
  if (Object.keys(props.alert).length > 0) {
    return (
      <div
        className={`${
          props.alert.message !== "success" ? "bg-red-500" : "bg-green-500"
        } text-center px-3 py-2 text-white uppercase font-bold shadow-lg break-words`}
      >
        {props.alert.message}
      </div>
    );
  }
}
