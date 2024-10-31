import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TUserForm, TUserTask } from '../types';
import Button from '../ui/Button';
import Task from '../components/Task';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchTasks, postTasks } from '../slices/todoSlice';
import CLEAR from "../assets/delete.png"
import ADD from "../assets/add.png"
import { motion } from 'framer-motion';

const HomePage = () => {
  const items = useSelector<RootState, TUserTask[]>((state) => state.todos.data)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('isLoggedIn')) {
      navigate('/login', { state: { from: location } })
    }
  }, [location, navigate])

  const [taskInput, setTaskInput] = useState('')
  const { handleSubmit } = useForm<TUserForm["tasks"]>()

  const onSubmit: SubmitHandler<TUserForm["tasks"]> = () => {
    const data = {
      id: Date.now(),
      text: taskInput,
      completed: true
    }
    dispatch(postTasks(data))
    setTaskInput('')
  }

  const clearInput = () => {
    setTaskInput('')
  }

  const [tab, setTab] = useState("all")

  let filteredItems = items;
  if (tab === "now") {
    filteredItems = items.filter((i) => i.completed === true);
  } else if (tab === "completed") {
    filteredItems = items.filter((i) => i.completed === false);
  }
  const totalAll = items.length;
  const totalNow = items.filter((i) => i.completed === true).length;
  const totalCompleted = items.filter((i) => i.completed === false).length;

  return (
    <div className='tablet:p-10 tablet:w-[1000px] bg-white tablet:mx-auto my-8 rounded-2xl phone:w-full phone:mx-3 phone:px-5  phone:py-10 custom-container'>
      <section className='w-full'>
        <motion.form
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className='flex items-start justify-between gap-4'
          onSubmit={handleSubmit(onSubmit)}>
          <Button type='submit'>
            <span className="phone:hidden tablet:block">Добавить</span>
            <img src={ADD} alt="" />
          </Button>
          <div className="relative flex flex-col gap-3 flex-1">
            <input
              className="bg-white appearance-none block w-full px-3 py-2 border border-gray rounded-md shadow-sm placeholder-gray focus:outline-primary"
              type="text"
              id="username"
              placeholder='Введите задачу'
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
          </div>
          <Button action={clearInput} type='reset'>
            <span className="phone:hidden tablet:block">Очистить</span>
            <img src={CLEAR} alt="" />
          </Button>
        </motion.form>
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}>
          <ul className='flex justify-between my-4 tablet:flex-row phone:flex-col	'>
            <li
              onClick={() => setTab("now")}
              className={`${tab === "now" && "underline"} flex gap-2 cursor-pointer`}>
              Текущие дела
              <span>({totalNow})</span>
            </li>
            <li
              onClick={() => setTab("all")}
              className={`${tab === "all" && "underline"} flex gap-2 cursor-pointer`}>
              Все дела
              <span>({totalAll})</span>
            </li>
            <li
              onClick={() => setTab("completed")}
              className={`${tab === "completed" && "underline"} flex gap-2 cursor-pointer`}>
              Выполненные дела
              <span>({totalCompleted})</span>
            </li>
          </ul>
        </motion.nav>
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.9 }}
          className='min-h-96'>
          {filteredItems.map(item =>
            <Task key={item.id} item={item} />
          )}
        </motion.ul>
      </section>
    </div>
  );
};

export default HomePage;
