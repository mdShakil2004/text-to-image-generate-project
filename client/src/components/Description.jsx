import { assets } from "../assets/assets";
import { motion } from "framer-motion";
const Description = () => {
  return (
    <motion.div 
    initial={{ opacity: 0.2,y: 100}}
    transition={{duration: 1}}
    whileInView={{y: 0, opacity: 1}}
    viewport={{once: true}}
    className="flex flex-col items-center justify-center my-24 p-6 md:px-28">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Create AI Images
      </h1>
      <p className="text-gray-500 mb-8">
        Use this tool to create an images using AI
      </p>
      <div className="flex flex-col gap-5 md:gap-14 md:flex-row items-center">
        <img
          className="w-80 xl:w-96 rounded-lg "
          src={assets.sample_img_1}
          alt=""
        />
        <div className="flex flex-col">
          <h2 className="text-gray-600 text-3xl font-medium max-w-lg mb-4  ">
            Introducing the AI-Powered Text to Images Generator{" "}
          </h2>
          <p className="text-gray-600 mb-4">
            This tool uses AI to generate images from text. Its a game-changer
            for content creators , marketers, and anyone who wants to create
            images based on their content.{" "}
          </p>
          <p className="text-gray-600 ">
            With this tool, you can create images that are tailored to your
            content, tone, and style. For example - a logo for a tech startup
            that will be used to create images - a postcard for a local event
            that will be used to create images - a billboard for a fashion show
            that will be used to create images brand
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default Description;
