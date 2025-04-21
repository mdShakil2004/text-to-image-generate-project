import Description from "../components/Description";
import Header from "../components/Header";
import Steps from "../components/Steps";
import Testimonial from "../components/Testimonial";
import GenerateBtn from "../components/GenerateBtn";
function Home() {
  return (
    <div>
      <Header />
      <Steps />
      <Description />
      <Testimonial />
      <GenerateBtn />
    </div>
  );
}

export default Home;
