import { FC } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { TUserForm } from "../types";

type TProps = {
  label: string;
  value: string;
  setUserChange: (newValue: string) => void;
  register: UseFormRegister<TUserForm>;
  errors: FieldErrors<TUserForm>;
  name: keyof TUserForm;
}

const Input: FC<TProps> = ({ value, setUserChange, register, errors, name, label }) => {

  return (
    <div className="relative pb-6 flex flex-col gap-3 flex-1">
     {label&& <label className='text-sm font-medium'
        htmlFor={name}>
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </label>}
      <input
        {...register(name,  {
          required: "Введите данные"    
        })}
        className="appearance-none block w-full px-3 py-2 border bg-white
        border-gray rounded-md shadow-sm placeholder-gray focus:outline-primary"
        type="text"
        id="username"
        placeholder={`Введите ${label ?label : 'задачу' }`}
        value={value}
        onChange={(e) => setUserChange(e.target.value)}
      />
      {errors[name] && <span className="absolute  bottom-0 left-0 text-red">{errors[name].message}</span>}
    </div>
  );
}

export default Input;