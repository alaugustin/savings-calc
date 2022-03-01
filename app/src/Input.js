import './Input.css';

function Input(props) {
  return (
    <>
      <Input type={props.labelType} id={props.labelId} name={props.labelName} value={props.labelValue} />
    </>
  );
}

export default Input;
