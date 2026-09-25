import Footer from "../../components/footer";
import Nav from "../../components/nav";

export default function Hydro() {
  return (
    <div className="project-shell">
      <Nav />
      <h2>Hydroponics Control Unit</h2>
      <img src='/hydro.png' className="data-img" />

      <p>This project presents an Artificial Intelligence (AI) and Internet of Things (IoT) enabled hydroponic
        grow tent that implements the Nutrient Film Technique (NFT) for leafy green plant production. The
        system uses a Random Forest Classifier (RFC) and various sensors for the real-time, accurate
        management of nutrient levels, pH, light, temperature, and humidity to provide an optimal
        environment for crop growth, in most cases, regardless of the weather patterns outside the tent. The
        system further includes a mobile application that allows farmers to interact with and manage all the
        elements in the tent.
      </p>

      <h3>Features</h3>
      <ul>
        <li>
          <p>Light control</p>
        </li>
        <li>
          <p>Humidifier control</p>
        </li>
        <li>
          <p>Extractor fan control</p>
        </li>
        <li>
          <p>Cooling fan control</p>
        </li>
        <li>
          <p>pH sensor control</p>
        </li>
        <li>
          <p>EC control</p>
        </li>
        <li>
          <p>Water level sensor control</p>
        </li>
        <li>
          <p>Temperature, water level, humidity, pH Level, and EC readings</p>
        </li>
      </ul>

      <h3>Demo</h3>

      <div className="hydro-images">
        <img src="/hydro-tent.webp" className="hydro-img" />
        <img src="/hydro-tent2.webp" className="hydro-img" />
      </div>
      <iframe
        src="https://drive.google.com/file/d/1H1LwVCdY3Ux9-dT21coYqJhvtkuSdwEm/preview"
        width="400px"
        height="700px"
        allowFullScreen>
      </iframe>

      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  )
}
