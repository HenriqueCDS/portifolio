import './footer.css'
import { InstagramLogo, FinnTheHuman,DiscordLogo, FacebookLogo,Phone,MapPin,Envelope    } from 'phosphor-react';
export default function FootContacts(){
    return(
        <footer >
       
        <div className="footerContainer">
                    <div className="footerLogo">
                        
                        <h1> Devツ</h1>
                    </div>
                    
                   
                    <div className="footerLinks">
                        <h3>Contatos</h3>
                        <ul>
                            <li><a href="#"><Phone />19 995454391</a></li>
                            <li><a href="#"><MapPin />SP/CAMPINAS</a></li>
                            <li><a href="#"><Envelope />henriquecordeiro054@gmail.com</a></li>
                        </ul>
                    </div>
                   
                </div>
                <div className="footerBottom"><a href="#"><i className="icon ion-social-facebook"></i></a><a href="#"><i className="icon ion-social-twitter"></i></a><a href="#"><i className="icon ion-social-snapchat"></i></a><a href="#"><i className="icon ion-social-instagram"></i></a>
                    <p className="copyright">copyright© 2023 </p>
                    <div className="footerContact">
                    <ul>
                      <li><a href="#"><i className="fab fa-facebook-f"><FacebookLogo size={24} /></i></a></li>
                      <li><a href="#"><i className="fab fa-instagram"></i><InstagramLogo size={24}/></a></li>
                      <li><a href="#"><i className="fab fa-twitter"></i><DiscordLogo size={24} /></a></li>
                    </ul>
                    </div>
                </div>
           
      

    </footer>

    )
}