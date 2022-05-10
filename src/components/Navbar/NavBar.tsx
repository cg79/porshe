import styles from "./NavBar.module.css";
import Logo from "./logo";
// import "./navbar.css";

const NavBar = (props: any) => {
  return (
    <>
      <section className={styles.container}>
        <nav className={styles.navbar}>
          <div className={styles.logo}>
            <Logo />
          </div>
          <ul className={styles.items}>
            <li>Overview</li>
            <li>Companies</li>
            <li>Support</li>
            <li>Profile</li>
          </ul>
        </nav>
      </section>
      {props.children}
    </>
  );
};
export default NavBar;
