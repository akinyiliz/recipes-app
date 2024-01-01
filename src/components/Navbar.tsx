import { Link } from "react-router-dom";
import { GiKnifeFork } from "react-icons/gi";

function Navbar() {
  return (
    <nav className="max-w-7xl mx-auto py-2 px-4 h-16">
      <Link to={"/"} className="flex items-center">
        <GiKnifeFork size={25} />
        <h1 className="logo">RecipeHub</h1>
      </Link>
    </nav>
  );
}

export default Navbar;
