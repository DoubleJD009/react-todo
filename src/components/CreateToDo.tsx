import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { categoryState, IToDo, toDoState } from "../atom";

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 11pt;
  flex-grow: 1;
`;
interface IForm {
  toDo: string;
}

function CreateToDo() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<IForm>();

  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const onValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => {
      const newTodos = [
        { text: toDo, id: Date.now(), category: category },
        ...oldToDos,
      ];
      return newTodos;
    });

    setValue("toDo", "");
  };
  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <Input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <button>Add</button>
    </Form>
  );
}

export default CreateToDo;
