import { useEffect, useState } from "react";
import vapeIcon from '../icons/vape.png';

export default function Home() {
  return (
    <div className="app__body">
      <header className="app__header">
        <h1>
          AtmosHelper
          <img src={vapeIcon} width="25px" height="25px" />
        </h1>
      </header>
      <section className="app__section">

      </section>
    </div>
  );
}
