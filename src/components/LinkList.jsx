import NavLink from "./NavLink";

export default function LinkList({ list, pathname }) {
  return (
    <>
      {list.map((navlink) => {
        let iconToBeUsed = pathname === navlink.pathname;
        console.log(pathname === navlink.pathname, pathname, iconToBeUsed)
        return (
          <div key={navlink.pathname}>
            <NavLink
              icon={iconToBeUsed ? navlink.icons[1] : navlink.icons[0]}
              pathname={navlink.pathname}
              title={navlink.title}
            />
          </div>
        );
      })}
    </>
  );
}
