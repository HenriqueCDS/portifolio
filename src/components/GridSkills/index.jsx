import Skill from "./Skill";
import './gridSkills.css';
import js from "../../assets/icon/js.png";
import c from "../../assets/icon/c.png";
import c_ from "../../assets/icon/C++.png";
import nodejs from "../../assets/icon/nodejs.png";
import expressjs from "../../assets/icon/express.png";
import react from "../../assets/icon/react.png";
import mongodb from "../../assets/icon/mongodb.png";
import php from "../../assets/icon/php.png";
import python from "../../assets/icon/python.png";
import java from "../../assets/icon/java.png"

export default function GridSkills(prop){
    return(
        <section className="grid-skils">
                <div className="container">
                    <div className="container-skils">

                        <Skill key="1" title = "Javascript" 
                            descris ="JavaScript é uma linguagem de programação interpretada estruturada, de script em alto nível com tipagem dinâmica fraca e multiparadigma. Juntamente com HTML e CSS, o JavaScript é uma das três principais tecnologias da World Wide Web." 
                            icon={js}  />

                        <Skill key="2"  title = "C" 
                            descris ="C é uma linguagem de programação compilada de propósito geral, estruturada, imperativa, procedural, padronizada pela Organização Internacional para Padronização (ISO)" 
                            icon={c} />

                        <Skill key="3" title = "C++" 
                            descris="é uma linguagem de programação de alto nível e de uso geral, que se caracteriza por ser compilada e multi-paradigma. Ela é uma extensão da linguagem C, com recursos adicionais como suporte à programação orientada a objetos." 
                            icon={c_} />

                        <Skill key="4" title = "Node js" 
                            descris ="Node.js é um software de código aberto, multiplataforma, baseado no interpretador V8 do Google e que permite a execução de códigos JavaScript fora de um navegador web. A principal característica do Node.js é sua arquitetura assíncrona e orientada por eventos."
                            icon={nodejs} />

                        <Skill key="5" title = "React" 
                            descris ="O React é uma biblioteca front-end JavaScript de código aberto com foco em criar interfaces de usuário em páginas web."
                            icon={react} />

                        <Skill key="7" title = "PHP"
                            descris ="PHP é uma linguagem interpretada livre, usada originalmente apenas para o desenvolvimento de aplicações presentes e atuantes no lado do servidor, capazes de gerar conteúdo dinâmico na World Wide Web" 
                            icon={php} />

                        <Skill key="8" title = "Mongodb" 
                            descris ="MongoDB é um software de banco de dados orientado a documentos livre, de código aberto e multiplataforma, escrito na linguagem C++. Classificado como um programa de banco de dados NoSQL, o MongoDB usa documentos semelhantes a JSON com esquemas. " 
                            icon={mongodb} />

                        <Skill key="9" title = "Express.js" 
                            descris="Express.js é um framework para Node.js que fornece recursos mínimos para construção de servidores web. Foi lançado como software livre e de código aberto sob a Licença MIT. É um dos mais populares frameworks para servidores em Node.js."
                            icon={expressjs} />

                        <Skill key="10" title = "Python" 
                            descris ="Python é uma linguagem de programação de alto nível, interpretada de script, imperativa, orientada a objetos, funcional, de tipagem dinâmica e forte. Foi lançada por Guido van Rossum em 1991." 
                            icon={python} />

                        <Skill key="11" title = "Java"
                            descris ="Java é uma linguagem de programação orientada a objetos desenvolvida na década de 90 por uma equipe de programadores chefiada por James Gosling, na empresa Sun Microsystems, que em 2008 foi adquirido pela empresa Oracle Corporation" 
                            icon={java} />
                    </div>
                </div>
        </section>
    )

}