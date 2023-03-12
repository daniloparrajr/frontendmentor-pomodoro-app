import { ReactComponent as Logo } from "../assets/logo.svg";

const Header = () => {
  return (
    <div className="pt-8 pb-10 md:pt-20 md:pb-12">
      <Logo
        className="mx-auto block w-full max-w-[118px] md:max-w-[157px]"
        alt="Pomodoro App"
      />
    </div>
  );
};

export default Header;
