import { atom, selector } from "recoil";

//Local Storage 에서 ToDo 데이터 불러오기
export const loadToDoFromLocalStorage = (): IToDo[] => {
  try {
    const serializedState = localStorage.getItem("toDo");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading state from localStorage:", err);
    return [];
  }
};

//Local Storage 에서 ToDo 데이터 저장
export const saveToDoToLocalStorage = (data: IToDo[]): void => {
  try {
    const serializedState = JSON.stringify(data);
    localStorage.setItem("toDo", serializedState);
  } catch (err) {
    console.error("Error saving state to localStorage:", err);
  }
};

//Local Storage 에서 Category 데이터 불러오기
export const loadCategoryFromLocalStorage = (): string[] => {
  try {
    const serializedState = localStorage.getItem("categoryList");
    if (serializedState === null) {
      return [];
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Error loading state from localStorage:", err);
    return [];
  }
};

//Local Storage 에서 Category 데이터 저장
export const saveCategoryToLocalStorage = (data: string[]): void => {
  try {
    const serializedState = JSON.stringify(data);
    localStorage.setItem("categoryList", serializedState);
  } catch (err) {
    console.error("Error saving state to localStorage:", err);
  }
};

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
  "DELETE" = "DELETE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: "category",
  default: Categories.TO_DO,
});

export const categoryListState = atom<string[]>({
  key: "categoryList",
  default: loadCategoryFromLocalStorage(),
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: loadToDoFromLocalStorage(),
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
