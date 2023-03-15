import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom: persistToDo } = recoilPersist({
  key: "toDo",
  storage: localStorage,
});

const { persistAtom: persistCategory } = recoilPersist({
  key: "categoryList",
  storage: localStorage,
});

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
  default: [],
  effects_UNSTABLE: [persistCategory],
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistToDo],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
