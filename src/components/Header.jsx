import { ReactComponent as Logo } from "../assets/logo.svg";

const Header = () => {
  return (
    <div className="pt-8 pb-10 md:pt-20 md:pb-12 lg:pt-12 lg:pb-14">
      <h1 className="sr-only">Frontend Mentor | Pomodoro app</h1>
      <Logo className="mx-auto block w-full max-w-[118px] md:max-w-[157px]" />
    </div>
  );
};

export default Header;
