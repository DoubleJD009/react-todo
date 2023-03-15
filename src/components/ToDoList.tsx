import React from "react";
import { useForm } from "react-hook-form";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { toDoState } from "../atom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList() {
  const toDos = useRecoilValue(toDoState);
  // const value = useRecoilValue(toDoState);
  // const modFn = useSetRecoilState(toDoState);

  // console.log(errors);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
    </div>
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
