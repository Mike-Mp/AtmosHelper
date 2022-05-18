import { Link } from "react-router-dom"

export default function NavLink({pathname, icon, title}) {
    return (
     <Link to={pathname}>
        <button>
          <img src={icon} width="25px" height={"25px"} />
          {title ? <span>{title}</span> : ""}
        </button>
      </Link>
    )
}