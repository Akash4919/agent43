import NaVBar from "./landingPageComponents/navBar/navbar";
import Heading from "./landingPageComponents/heading/heading";
import MiddleThree from "./landingPageComponents/middleThree/middleThree";
import Footer from "./landingPageComponents/footer/footer";
import "./mainLanding.css";
const LandingPage = function () {
  return (
    <div className="MainApp">
      <NaVBar />
      <Heading />
      <MiddleThree />
      <Footer />
    </div>
  );
};

export default LandingPage;
