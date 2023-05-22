import React from "react";
import '../styles/Footer.css'

function Footer () {
    return(
       <div className="footer">
            Copyright © {new Date().getFullYear()}
       </div>
)}

export default Footer