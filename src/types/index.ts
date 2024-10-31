export type TUserForm = {
  username: string;
  password: string;
  tasks: TUserTask[];
}

export type TUserTask = {
  id: number;
  text: string;
  completed: boolean;
}