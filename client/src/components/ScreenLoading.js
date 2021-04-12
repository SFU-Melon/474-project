import "./ScreenLoading.css";
//import Leaf_SVG from "../assets/leaf-animation.svg";
import Melon_SVG from "../assets/melon.svg";
export default function ScreenLoading() {
  return (
    <div
      className="display-grid-center"
      style={{ width: "100vw", height: "100vh" }}
    >
      <img src={Melon_SVG} width="150" height="150" />
    </div>
  );
}
