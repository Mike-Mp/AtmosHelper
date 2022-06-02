import closeIcon from '../icons/close.svg';

export default function Message({type, content, setMessage}) {
    console.log(type, content)
    console.log(typeof type, typeof content);
  return (
    <div className={`message message--${type}`}>
      <span>{type}: </span>
      <span>{content}</span>
      <img src={closeIcon} onClick={setMessage}/>
    </div>
  );
}
