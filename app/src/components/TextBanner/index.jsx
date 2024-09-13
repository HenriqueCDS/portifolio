import './TextBanner.css'
export default function TexBanner(prop) {

    return(
      <section class="text-banner">
        <div class="text-banner">
          <div class="track">
            <div class="content">
              <h1>&nbsp;{prop.text}</h1>
            </div>
          </div>
        </div>
      </section>
    )
    
}