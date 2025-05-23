import { assets } from "../assets/assets";
import { useContext, useState } from "react";
import {motion} from "framer-motion";
import { AppContext } from "../context/AppContext";

function Result() {
  // for show images
  const [image, setImage] = useState(assets.sample_img_1);
  // for show text
  // const [text, setText] = useState("Loading...");
  // for isImageLoaded
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  // for loading
  const [loading, setLoading] = useState(false);
  // for input
  const [input, setInput] = useState("");



  const {generateImage}=useContext(AppContext)

  // on submit handler 
  const onSubmitHandler = async (e) => {
    e.preventDefault(); // prevent default behavior of form 
    setLoading(true);
    
    if(input)
    {  
      const image=await generateImage(input);
      setImage(image);
      if(image)
      {
        // set the image 
        setIsImageLoaded(true);
       setImage(image);

      }
    }
    else{
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center justify-center min-h-[90vh]"

      initial={{ opacity: 0.2,y: 100}}
      transition={{duration: 1}}
      whileInView={{y: 0, opacity: 1}}
      viewport={{once: true}}


    >
      <div>
        <div className="relative">
          <img src={image} alt="" className="max-w-sm rounded" />
          <span
            className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${
              loading ? "w-full transition-all duration-[10s]" : "w-0"
            } `}
          />
        </div>
        <p className={!loading ? "hidden" : " "}>Loading....</p>
      </div>

      {!isImageLoaded && (
        <div className="flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full ">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            className=" flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color"
            type="text"
            placeholder="what do you want to generate"
          />
          <button
            className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full"
            type="submit"
          >
            Generate
          </button>
        </div>
      )}
      {isImageLoaded && (
        <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
          <p
            onClick={() => setIsImageLoaded(!isImageLoaded)}
            className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer"
          >
            Generate Another
          </p>
          <a
            className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full cursor-pointer"
            href={image}
            download
          >
            Download
          </a>
        </div>
      )}
    </motion.form>
  );
}

export default Result;
