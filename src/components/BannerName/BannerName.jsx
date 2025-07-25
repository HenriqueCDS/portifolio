
import './BannerName.css'
import {  GithubLogo, LinkedinLogo, } from 'phosphor-react';
import Spline from "@splinetool/react-spline";

export default function BannerName() {

    return(
        <section id="banner" className="banner">
            <div className="container">
                <Spline className='container-scene' scene="https://prod.spline.design/h3Vn4gTWwdZajTfH/scene.splinecode" />
 
                <div className='container-banner'>

                    <div className='text-image'>
                        <h1>Henrique Cordeiroツ</h1>
                        <h2>&nbsp;Eii sou desenvolvedor Fullstack, Bem vindo ao meu portifolio!!</h2>
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