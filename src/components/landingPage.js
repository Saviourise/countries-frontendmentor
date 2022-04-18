import { colors } from "../colors/color";
import "./landingPage.css";
import Nav from "./nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import request from "superagent";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [countries, setcountries] = useState([]);
  const [searchParam, setsearchParam] = useState("");
  const [mode, setmode] = useState("dark");

  const handleSearchChange = (e) => {
    let searchItem = e.target.value;
    setsearchParam(searchItem);
  };

  const getSelectValue = () => {
    var selectedValue = document.getElementById("select-region").value;
    if (selectedValue === "Filter by Region") return getCountries("all");
    area(selectedValue);
  };

  const area = (area) => {
    area = `region/${area}`;
    getCountries(area);
  };

  const getCountries = (country) => {
    if (country !== "all" && country.includes("region") === false)
      country = `name/${country}`;

    request
      .get(`https://restcountries.com/v3.1/${country}`)
      .then((data) => {
        console.log(data.body);
        setcountries(data.body);
      })
      .catch((error) => {
        //console.log(error);
        alert(error.message);
      });
  };

  useEffect(() => {
    let search = searchParam;
    if (searchParam === "") search = "all";
    getCountries(search);
  }, [searchParam]);

  const mod = (mod) => {
    setmode(mod);
  };

  return (
    <div
      style={
        mode === "light"
          ? { backgroundColor: colors.lightModeBackground }
          : { backgroundColor: colors.darkModeBackground }
      }
      id="landing-page-con"
    >
      <Nav mod={mod} />

      <div id="search-con">
        <div id="search-input-con">
          <FontAwesomeIcon
            icon={faSearch}
            style={{
              position: "absolute",
              marginTop: 15,
              marginLeft: 30,
              color: "#aaa",
            }}
          />
          <input
            id="search-input"
            placeholder="Search for a country..."
            type="search"
            onChange={handleSearchChange}
            value={searchParam}
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
          />
        </div>

        <div id="select-region-con">
          <select
            id="select-region"
            onChange={getSelectValue}
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
            <option className="option">Filter by Region</option>
            <option className="option" value="africa">
              Africa
            </option>
            <option className="option" value="america">
              America
            </option>
            <option className="option" value="asia">
              Asia
            </option>
            <option className="option" value="europe">
              Europe
            </option>
            <option className="option" value="oceania">
              Oceania
            </option>
          </select>
        </div>
      </div>

      {countries.length === 0 ? (
        <p
          style={
            mode === "light"
              ? {
                  color: colors.lightModeText,
                }
              : {
                  color: colors.darkModeText,
                }
          }
        >
          Loading...
        </p>
      ) : (
        <div id="countries-cards-container">
          {countries.length === 0 ? (
            <>Could not find a country with the specified name</>
          ) : (
            countries.map((country, i) => {
              return (
                <Link
                  to={`/${country.name.common}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    id="country-card"
                    key={i}
                    style={
                      mode === "light"
                        ? {
                            backgroundColor: colors.lightModeElements,
                            boxShadow: `0px 0px 10px -5px grey`,
                          }
                        : {
                            backgroundColor: colors.darkModeElements,
                            boxShadow: `0px 0px 10px -5px black`,
                          }
                    }
                  >
                    <img
                      className="card-img"
                      src={country.flags.png}
                      alt="Could not generate img"
                    />
                    <p
                      className="card-text"
                      style={
                        mode === "light"
                          ? { color: colors.lightModeText }
                          : { color: colors.darkModeText }
                      }
                    >
                      <p className="card-text-name">{country.name.common}</p>
                      <br></br>
                      <p className="card-text-2">
                        <b>Population: </b>
                        {country.population.toLocaleString()}
                      </p>
                      <p className="card-text-2">
                        <b>Region: </b>
                        {country.region}
                      </p>
                      <p className="card-text-2">
                        <b>Capital: </b>
                        <>{country.capital}</>
                      </p>
                    </p>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default LandingPage;
