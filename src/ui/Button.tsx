import { FC, ReactNode } from "react";


type TProps = {
  children: ReactNode;
  type: any;
  action?: () => void;
}

const Button: FC<TProps> = ({ children, type, action }) => {
  return (
    <button
      onClick={action}
      className="relative flex gap-2 justify-center py-2 px-4 text-base border border-primary font-medium rounded-md text-black hover:bg-primary-hover transition ease-in-out"
      type={type} >
      {children}
    </button>
  );
}

export default Button;