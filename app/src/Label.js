import './Label.css';

function Label(props) {
  return (
    <>
      <label htmlFor={props.htmlFor}>{props.labelCopy}</label>
    </>
  );
}

export default Label;
