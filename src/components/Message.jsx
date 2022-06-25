import closeIcon from "../icons/close.svg";

export default function Message({ type, content, setMessage, actionToDo }) {
  console.log(type, content);
  return (
    <div className={`message message--${type}`}>
      <div className={`message__top`}>
        <h3>{type} </h3>
      <img src={closeIcon} onClick={() => setMessage({ show: false })} />
      {type === "confirm" ? (
        <div>
          <span>delete?</span>
          <button onClick={setMessage({ show: false })}>No</button>
          <button onClick={actionToDo}>Yes</button>
        </div>
      ) : (
        ""
      )}
      </div>
      <p>{content}</p>
      
    </div>
  );
}
