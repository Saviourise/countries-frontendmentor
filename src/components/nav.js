import "./nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon as moonOutline } from "@fortawesome/free-regular-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { colors } from "../colors/color";

const Nav = (props) => {
  const [mode, setmode] = useState("dark");

    const changeMode = () =>
    {
        if ( mode === 'light' )
        {
            setmode( "dark" );
            return props.mod( 'dark' );
        }
        setmode( "light" );
        return props.mod( 'light' );
    }

  return (
    <div
      id="nav-con"
      style={
        mode === "light"
          ? {
              backgroundColor: colors.lightModeElements,
              boxShadow: `0px 0px 10px -5px grey`,
              color: colors.lightModeText,
            }
          : {
              backgroundColor: colors.darkModeElements,
              boxShadow: `0px 0px 10px -5px black`,
              color: colors.darkModeText,
            }
      }
    >
      <h2 id="where-in-the-world">Where in the world?</h2>
      <p id="dark-mode" onClick={changeMode}>
        <FontAwesomeIcon
          icon={mode === "light" ? moonOutline : faMoon}
          style={{ marginRight: 10 }}
        />
        {mode === 'light' ? <>Dark Mode</> : <>Light Mode</>}
      </p>
    </div>
  );
};

export default Nav;
