import "./ScreenLoading.css";
import Leaf_SVG from "../assets/leaf-animation.svg";
export default function ScreenLoading() {
  return (
    <div
      className="display-grid-center"
      style={{ width: "100vw", height: "100vh" }}
    >
      <img src={Leaf_SVG} width="150" height="150" />
    </div>
  );
}
