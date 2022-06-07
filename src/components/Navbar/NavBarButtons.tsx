import Link from "next/link";
import { NextRouter } from "next/router";
import styles from "./NavBar.module.css";

import { ROUTE__INFO } from "./NavBar";

export const NAVIGATION_ROUTES: ROUTE__INFO[] = [
  { url: "/overview", name: "Overview" },
  { url: "/companies", name: "Companies" },
  { url: "/support", name: "Support" },
];

const NavBarButtons = (buttons: ROUTE__INFO[], router: NextRouter) => {
  return buttons.map((button, index) => {
    return (
      <li
        key={index}
        className={router.pathname == button.url ? styles.items__active : ""}
      >
        <div className={styles.menuitem}>
          <Link href={button.url}>
            {button.name}
          </Link>
        </div>
      </li>
    );
  });
};

export default NavBarButtons;
