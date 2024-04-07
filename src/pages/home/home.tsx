import Nav from "./sidebar";
import "./home.css";
import img from "../static/home.png";
import { Heading } from "@chakra-ui/react";

export function Home() {
  return (
    <div className="home">
      <Nav />
      <Heading pt={20} color={"darkblue"}>
        UPBEAT
      </Heading>
      <img src={img} alt="home" width={500} style={{ paddingTop: "40px" }} />
      <div className="bottom">
        <div>Feeling Stressed ? Take a deep breath and open UPBEAT</div>
        <div>Find your moment of calm within chaos</div>
      </div>
    </div>
  );
}
