
import BannerName from "../../components/BannerName/BannerName";
import FootContacts from "../../components/FootContacts";
import GridSkills from "../../components/GridSkills";
import Navbar from "../../components/Navbar/Navbar";
import GridProjects from "../../components/ProjectsGrid";
import TexBanner from "../../components/TextBanner";
import Loader from '../../components/Loader';
import { useEffect,useState } from 'react';



export default function Home() {

    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
    
      useEffect(() => {
        const timer = setTimeout(() => {
          setLoading(false); 
        }, 8500); 
    
        return () => clearTimeout(timer);
      }, []);


      useEffect(() => {
        if (loading) {
            document.body.style.overflow = 'hidden'; // Impede scroll
            
        } else {
            document.body.style.overflow = 'visible'; // Restaura scroll
        }

        return () => {
            document.body.style.overflow = 'visible'; // Precaução para desmontar
        };
      }, [loading]);
            
            


    return(
        <section>
        {loading && <Loader />}
            
        <div className={`page-content ${loading ? 'hidden' : 'visible'}`}>
                <Navbar />
                <BannerName />
                
                <TexBanner  text={"Showcasing My  Developer #Projects Portfolio Showcasing My Developer Portfolio Showcasing My  Developer #Projects  Portfolio"}/>
                
                <GridProjects />

                <TexBanner  text={"Showcasing My  Developer #Skills  Portfolio Showcasing My  Developer Portfolio  Showcasing My Developer  #Skills Portfolio"}/>
                
                <GridSkills />    
            
                <TexBanner  text={"Showcasing My #Contact Portfolio Showcasing My #Contact Portfolio Showcasing My #Contact Developer Portfolio"}/>

                <FootContacts />
            </div>
        </section>
    )
    
}