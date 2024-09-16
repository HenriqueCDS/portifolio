import BannerName from "../../components/BannerName/BannerName";
import GridSkills from "../../components/GridSkills";
import Navbar from "../../components/Navbar/Navbar";
import TexBanner from "../../components/TextBanner";

export default function Home() {

    return(
        <section>
            <Navbar page = {'home'}/>
            
            <BannerName />
            
            <TexBanner  text={"Showcasing My Creative Developer Portfolio Showcasing My Creative Developer Portfolio Showcasing My Creative Developer Portfolio"}/>

            <GridSkills />

        </section>
    )
    
}