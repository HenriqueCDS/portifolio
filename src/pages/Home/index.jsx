import BannerName from "../../components/BannerName/BannerName";
import GridSkills from "../../components/GridSkills";

import Navbar from "../../components/Navbar/Navbar";
import TexBanner from "../../components/TextBanner";


export default function Home() {

    return(
        <section>
            <Navbar page = {'home'}/>
            
            <BannerName />
            
            <TexBanner  text={"Showcasing My  Developer #Skills  Portfolio Showcasing My  Developer Portfolio  Showcasing My Developer Skills Portfolio"}/>
            
            <GridSkills />    

            <TexBanner  text={"Showcasing My  Developer #Projects Portfolio Showcasing My Developer Portfolio Showcasing My  Developer Projects Portfolio"}/>
            
            
            <TexBanner  text={"Showcasing My #Contact Portfolio Showcasing My #Contact Portfolio Showcasing My  Developer Portfolio"}/>

        </section>
    )
    
}