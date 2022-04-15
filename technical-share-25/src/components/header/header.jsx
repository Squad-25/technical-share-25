import "./header.css";

import React from 'react'

export default function Header() {
  return (
<header class="header-bg">
    <div class="header container">
      <a href="./">
        <img src="./img/bikcraft.svg" alt="bikecraft"/>
      </a>

      <nav aria-label="primaria">
        <ul class="header-menu font-1-m cor-0">
          <li><a href="./bicicletas.html">Bicicletas</a></li>
          <li><a href="./seguros.html">Seguros</a></li>
          <li><a href="./contato.html">Contato</a></li>
        </ul>
      </nav>

    </div>
  </header>
  )
}
