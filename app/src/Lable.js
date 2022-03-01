import './Lable.css';

function Lable(props) {
  return (
    <>
      <Lable htmlFor={props.for}>{props.labelCopy}</Lable>
    </>
  );
}

export default Lable;
