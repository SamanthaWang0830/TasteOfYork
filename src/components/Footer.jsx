import React from "react";
import './Footer.css';

export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div> 
      <footer>
      <p>Bebicoders | Copyright @{year}</p>
      </footer>
    </div>
    
  );
}
