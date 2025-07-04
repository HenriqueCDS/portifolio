import './TextBanner.css'
export default function TexBanner(prop) {

    return(
      <section className="text-banner">
        <div className="text-banner">
          <div className="track">
            <div className="content">
              <h1>&nbsp;{prop.text}</h1>
            </div>
          </div>
          
        </div>
      </section>
    )
    
}