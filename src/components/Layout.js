import MultiActionAreaCard from "./restaurant";
import "../App.css"; // Подключаем CSS-файл для стилизации Layout

export const Layout = (props) => {
  return (
    <>
      {props.children}
      <div className="greeting-container">
        <h1>Приветствую?</h1>
        <div className="content-block">
          <p></p>
        </div>
        <div className="content-block1">
          <p></p>
        </div>
        <div className="card-row">
          <MultiActionAreaCard />
        </div>
      </div>
    </>
  );
};
