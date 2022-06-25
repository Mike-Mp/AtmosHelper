import NavLink from "./NavLink";

import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

export default function LinkList({ list, pathname }) {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      {list.map((navlink) => {

        let selected = navlink.pathname.includes(pathname);
        let iconToBeUsed = theme === "light";
        console.log(iconToBeUsed)
        return (
          <div key={navlink.pathname}>
            <NavLink
              icon={iconToBeUsed ? navlink.icons[2] : navlink.icons[0]}
              selected={selected}
              blueIcon={navlink.icons[1]}
              pathname={navlink.pathname}
              title={navlink.title}
            />
          </div>
        );
      })}
    </>
  );
}
