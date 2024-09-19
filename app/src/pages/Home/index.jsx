import BannerName from "../../components/BannerName/BannerName";
import GridProjects from "../../components/gridProjects/gridProjects";
import GridSkills from "../../components/GridSkills";
import Navbar from "../../components/Navbar/Navbar";
import TexBanner from "../../components/TextBanner";

export default function Home() {

    return(
        <section>
            <Navbar page = {'home'}/>
            
            <BannerName />
            
            <TexBanner  text={"Showcasing My  Developer Portfolio Showcasing My  Developer Portfolio  Showcasing My  Developer Portfolio"}/>

            <GridSkills />
            
            <TexBanner  text={"Showcasing My  Developer Portfolio Showcasing My Developer Portfolio Showcasing My  Developer Portfolio"}/>


            <GridProjects />

        </section>
    )
    
}