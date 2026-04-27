
import BannerName from "../../components/BannerName/BannerName";
import FootContacts from "../../components/FootContacts";
import GridSkills from "../../components/GridSkills";
import Navbar from "../../components/Navbar/Navbar";
import GridProjects from "../../components/ProjectsGrid";
import TexBanner from "../../components/TextBanner";
import Loader from '../../components/Loader';
import About from '../../components/About';
import Experience from '../../components/Experience';
import Education from '../../components/Education';
import { useEffect, useState } from 'react';

export default function Home() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        document.body.style.overflow = loading ? 'hidden' : 'visible';
        return () => {
            document.body.style.overflow = 'visible';
        };
    }, [loading]);

    return (
        <section>
            {loading && <Loader />}

            <div className={`page-content ${loading ? 'hidden' : 'visible'}`}>
                <Navbar />
                <BannerName />
                <About />
                <Experience />
                <Education />

                <TexBanner text="REST API · ETL · Integração de Sistemas · Python · Java · Backend · Dados · Automação · REST API · ETL · Integração de Sistemas · Python · Java · Backend · Dados · Automação" />

                <GridProjects />

                <TexBanner text="Node.js · Express · Spring Boot · MySQL · SQL Server · MongoDB · Docker · Git · Sequelize · JWT · Node.js · Express · Spring Boot · MySQL · SQL Server · MongoDB" />

                <GridSkills />

                <TexBanner text="Aberto a oportunidades · Backend · Engenharia de Dados · SP / Campinas · Remoto · Aberto a oportunidades · Backend · Engenharia de Dados · SP / Campinas" />

                <FootContacts />
            </div>
        </section>
    );
}
