
import './BannerName.css'
import {  GithubLogo, LinkedinLogo, } from 'phosphor-react';
export default function BannerName() {

    return(
        <section className="banner">
            <div className="container"> 
                <div className='container-banner'>

              
                    <div className='text-image'>
                        <h1>Henrique Devsツ</h1>
                        <h2>&nbsp;Ei sou desenvolvedor Fullstack, Bem vindo ao meu portifolio!!</h2>
                        <ul>
                            <li><a href="https://github.com/HenriqueCDS" target="_blank"><span><GithubLogo size={32} /></span></a></li>
                            <li><a href="https://www.linkedin.com/in/henrique-cordeiro-940709201/" target="_blank"><span><LinkedinLogo size={32} /></span></a></li>
                        </ul>

                    </div>
                    <div className="image-banner">
                    <img src="https://github.com/HenriqueCDS.png"/>    
                    </div>
                </div>
            </div>
        </section>
    )

}