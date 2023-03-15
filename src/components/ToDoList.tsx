import React from "react";
import { useForm } from "react-hook-form";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  Categories,
  categoryListState,
  categoryState,
  IToDo,
  toDoSelector,
  toDoState,
} from "../atom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const Header = styled.header`
  height: 5vh;
  font-size: 18pt;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const SelectDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Select = styled.select`
  padding: 10px;
  font-size: 13pt;
  border-radius: 10px;
  flex-grow: 1;
`;

const Hr = styled.hr`
  width: 100%;
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const [categoryList, setCategoryList] = useRecoilState(categoryListState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as IToDo["category"]);
  };

  const addCategory = (event: React.MouseEvent<HTMLButtonElement>) => {
    const newCategory = prompt("Custom category name", "");

    if (newCategory != null) {
      const newCategoryList = [...categoryList, newCategory];
      setCategoryList(newCategoryList);
    } else {
      return false;
    }
  };
  // const value = useRecoilValue(toDoState);
  // const modFn = useSetRecoilState(toDoState);
  // console.log(errors);

  return (
    <Container>
      <Header>To Dos</Header>
      <Hr />
      <Content>
        <SelectDiv>
          <Select value={category} onInput={onInput}>
            <option value={Categories.TO_DO}>To Do</option>
            <option value={Categories.DOING}>Doing</option>
            <option value={Categories.DONE}>Done</option>
            {categoryList?.map((category) => (
              <option value={category}>{category}</option>
            ))}
          </Select>
          <button value={Categories.DELETE} onClick={addCategory}>
            Add
          </button>
        </SelectDiv>
        <CreateToDo />
        <Hr />
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </Content>
    </Container>
  );

  // return (
  //   <div>
  //     <form
  //       style={{ display: "flex", flexDirection: "column" }}
  //       onSubmit={handleSubmit(onValid)}
  //     >
  //       <input
  //         {...register("email", {
  //           required: "Email is required",
  //           pattern: {
  //             value: /^[A-Za-z0-9._%+-]+@naver.com$/,
  //             message: "Only naver.com emails allowed",
  //           },
  //         })}
  //         placeholder="Email"
  //       />
  //       <span>{errors?.email?.message}</span>
  //       <input
  //         {...register("firstName", {
  //           required: "write here",
  //           validate: {
  //             noNico: (value) =>
  //               value.includes("nico") ? "no nicos allowed" : true,
  //           },
  //         })}
  //         placeholder="First Name"
  //       />
  //       <span>{errors?.firstName?.message}</span>
  //       <input
  //         {...register("lastName", { required: "write here" })}
  //         placeholder="Last Name"
  //       />
  //       <span>{errors?.lastName?.message}</span>
  //       <input
  //         {...register("username", { required: "write here", minLength: 10 })}
  //         placeholder="Username"
  //       />
  //       <span>{errors?.username?.message}</span>
  //       <input
  //         {...register("password", { required: "write here", minLength: 5 })}
  //         placeholder="Password"
  //       />
  //       <span>{errors?.password?.message}</span>
  //       <input
  //         {...register("password1", {
  //           required: "Password is required",
  //           minLength: {
  //             value: 5,
  //             message: "Your password is too short.",
  //           },
  //         })}
  //         placeholder="password1"
  //       />
  //       <span>{errors?.password1?.message}</span>
  //       <button>Add</button>
  //       <span>{errors?.extraError?.message}</span>
  //     </form>
  //   </div>
  // );
}

export default ToDoList;
