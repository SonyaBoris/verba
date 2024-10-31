import { FC } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { delTasks, updateTaskStatus } from "../slices/todoSlice";
import Button from "../ui/Button";
import DELETE from "../assets/clear.png";
import COMPLETED from "../assets/check.png";
import { TUserTask } from "../types";
import { motion } from 'framer-motion';

type TProps = {
  item: TUserTask;
}

const Task: FC<TProps> = ({ item }) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <motion.li
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="flex justify-between items-center mb-4">
      <span className={`${!item.completed && "line-through text-primary"}`}>
        {item.text}
      </span>
      <div className="flex gap-4">
        <Button type="reset" action={() => dispatch(delTasks(item.id))}>
          <span className="phone:hidden tablet:block">Удалить</span>
          <img src={DELETE} alt="" />
        </Button>
        <Button type="reset" action={() => dispatch(updateTaskStatus({ id: item.id, completed: !item.completed }))}>
          <span className="phone:hidden tablet:block">Выполнено </span>
          <img src={COMPLETED} alt="" />
        </Button>
      </div>
    </motion.li>
  );
}

export default Task;