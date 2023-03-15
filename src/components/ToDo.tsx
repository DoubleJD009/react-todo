import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { Categories, categoryListState, IToDo, toDoState } from "../atom";

const Li = styled.div`
  display: flex;
  font-size: 18pt;
  flex-direction: column;
`;

const LiButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  margin-top: 4px;
  button {
    margin: 0px;
  }
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const categoryList = useRecoilValue(categoryListState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo: IToDo = { text, id, category: name as IToDo["category"] };
      const newTodos = [...oldToDos]; // create new array
      if (name === Categories.DELETE) {
        newTodos.splice(targetIndex, 1);
      } else {
        newTodos.splice(targetIndex, 1, newToDo);
      }
      return newTodos;
    });
  };
  return (
    <Li>
      <span>{text}</span>
      <LiButtonDiv>
        {category !== Categories.DOING && (
          <button name={Categories.DOING} onClick={onClick}>
            Doing
          </button>
        )}
        {category !== Categories.TO_DO && (
          <button name={Categories.TO_DO} onClick={onClick}>
            To Do
          </button>
        )}
        {category !== Categories.DONE && (
          <button name={Categories.DONE} onClick={onClick}>
            Done
          </button>
        )}
        {categoryList?.map((newCategory) => {
          if (newCategory === category) return false;
          return (
            <button name={newCategory} onClick={onClick}>
              {newCategory}
            </button>
          );
        })}
        <button name={Categories.DELETE} onClick={onClick}>
          Delete
        </button>
      </LiButtonDiv>
    </Li>
  );
}

export default ToDo;
