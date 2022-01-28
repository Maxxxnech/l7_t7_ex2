import React from "react";
import "./css/Task.css";
export default function Task({ id, title, completed, clickHandler}) {
   const handleCLick = () => {
        clickHandler(id)
    }
    const text = completed? "Готово!" : "Не готово:(";
    const btnText = !completed? "Выполнить" : "Отменить";
    return (
    <li className="taskWrapper" >
      <ul className="task">
        <li><span  className={completed? "completed" : null}><b>{title}</b></span>: {text}</li>
        <li><button onClick={handleCLick}>{btnText}</button></li>
      </ul>
    </li>
  );
}
