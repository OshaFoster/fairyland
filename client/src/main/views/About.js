import React from "react";
import Emoji from 'react-emoji-render';

function About(){
    return(
      <div className="about">
        <div className="aboutTitle">
        <h2>Fairyland Café & Cupcakeria® </h2>
        <h2>Fundada em 2010</h2>
          <h2><Emoji text="⏰"/> Ter-Dom, das 14h às 20h </h2>
          <h2><Emoji text="🐶"/> Pet Friendly Place</h2>
          <h2><Emoji text="☎️"/> (48) 3209-7462 </h2>          
        </div>
        <br/>
        <div className="tripAdvisorBox">
            <div className="tripAdvisor">
                <br/>
                <h4>FairyLand Café & Cupcakeria</h4>
                <h5>Caminho dos Açores, 1740</h5>
                <h5>Santo Antonio de Lisboa</h5>
                <h5>Florianópolis</h5>
                <br/>
                <h4>Directions or Uber</h4>
                <h4 className="uber">Click Below </h4>
                  <i className="fa fa-map-o" aria-hidden="true"></i> &nbsp; 
                  <i className="fa fa-taxi" aria-hidden="true"></i> &nbsp;
                  <br/>
                  <br/>
          <div className="showtheway">
            <a href="https://showtheway.io/to/-27.514543,-48.51497?name=FairyLand%20Caf%26eacute%3B%20%26amp%3B%20Cupcakeria" title="Show the Way to FairyLand Café & Cupcakeria with your favorite navigation application">Show the Way</a>
          </div>
        </div>
            <div className="tripAdvisor">
                <div id="TA_selfserveprop66" className="TA_selfserveprop">
                      <ul id="sTHoXGMtQp" className="TA_links TxRvp6Cl">
                          <li id="CvleFmZaHI" className="hAyZtzG">                    
                              <a href="https://www.tripadvisor.com/"><img src="https://www.tripadvisor.com/img/cdsi/img2/branding/150_logo-11900-2.png" alt="TripAdvisor"/></a>
                          </li>
                      </ul>
                  </div>
            </div>
        </div>
      </div>
    )  
  }
  
export default About;