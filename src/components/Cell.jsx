import "../styles/Cell.css";

function Cell({ onClick, x, o }) {
  return (
    <div className="square" onClick={onClick}>
      <p>{x ? "x" : o ? "o" : ""}</p>
    </div>
  );
}

export default Cell;
