import LogoSvg from "../assets/Logo.svg";
import { useNavigate } from "react-router-dom";

export default function Logo({ size, justify }) {
  const height = size === "sm" ? "h-6" : "h-8";
  const fontSize = size === "sm" ? "text-xl" : "text-2xl";
  const navigate = useNavigate();

  let classes = "flex items-center gap-3";
  if (justify === "justify-center") {
    classes += " justify-center";
  }

  const navigateToHome = () => navigate("/");

  return (
    <div className={classes} role="button" onClick={navigateToHome}>
      <img className={height} src={LogoSvg} alt="logo" />
      <h2 className={`${fontSize} tracking-wider font-medium mb-0.5`}>
        getit<span className="text-primary">done</span>.
      </h2>
    </div>
  );
}
