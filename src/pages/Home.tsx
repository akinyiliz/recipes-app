import { motion } from "framer-motion";

import Dessert from "../components/Dessert";
import Popular from "../components/Popular";
import Vegetarian from "../components/Vegetarian";

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-7xl mx-auto"
    >
      <Popular />
      <Vegetarian />
      <Dessert />
    </motion.div>
  );
}

export default Home;
