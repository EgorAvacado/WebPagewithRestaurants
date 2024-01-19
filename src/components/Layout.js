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
          <MultiActionAreaCard /> {/* Первая карточка */}
          <MultiActionAreaCard /> {/* Вторая карточка */}
          <MultiActionAreaCard /> {/* Третья карточка */}
        </div>
        <div className="card-row">
          <MultiActionAreaCard /> {/* Четвертая карточка */}
          <MultiActionAreaCard /> {/* Пятая карточка */}
          <MultiActionAreaCard /> {/* Шестая карточка */}
        </div>
      </div>
    </>
  );
};
