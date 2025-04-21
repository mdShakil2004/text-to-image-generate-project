import { stepsData } from "../assets/assets";
import {motion} from "framer-motion";
const Steps = () => {
  return (
    <motion.div className="flex flex-col items-center justify-center my-32"
    initial={{y: 100, opacity: 0.2}}
    transition={{duration: 1}}
    whileInView={{y: 0, opacity: 1}}
    viewport={{once: true}}
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">How it works </h1>
      <p className="text-3xl text-gray-600 mb-6">
        Text transform word into stunning Images{" "}
      </p>
      <div className="space-y-4 w-full max-w-3xl text-sm">
        {stepsData.map((items, index) => (
          <div
            key={index}
            className="flex items-center gap-5 p-5 px-8 bg-white/20 shadow-sm border cursor-pointer hover:scale-[1.02] transition-all duration-300 rounded-lg"
          >
            <img width={40} src={items.icon} alt="" />
            <div>
              <h2 className="text-xl sm:text-2xl font-medium mb-2">
                {items.title}
              </h2>
              <p className=" sm:text-lg text-gray-500">{items.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Steps;
