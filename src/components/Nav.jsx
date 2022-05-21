import { useLocation } from "react-router-dom";

import { useState } from "react";

import { navLinks, dropDownLinks } from "../utils/navlinks";

import LinkList from "./LinkList";

import { toolsIconBlue, toolsIcon } from "../utils/navImports";

// import { useTranslation } from 'react-i18next';

export default function Nav() {
  // const { t, i18n } = useTranslation();

  const [drop, setDrop] = useState(false);

  const pathname = useLocation().pathname;

  return (
    <nav className="app__nav">
      <button className="app__dropdown-btn" onClick={() => setDrop((s) => !s)}>
        <img
          src={drop ? toolsIconBlue : toolsIcon}
          width={"23px"}
          height={"23px"}
        />
      </button>
      <LinkList list={navLinks} pathname={pathname} />

      {drop ? (
        <div className="app__dropdown">
          <LinkList list={dropDownLinks} pathname={pathname} />
        </div>
      ) : (
        <div className="app__dropdown inactive"></div>
      )}
    </nav>
  );
}
