import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import request from "superagent";
import Nav from "./nav";
import "./detail.css";
import { colors } from "../colors/color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Detail() {
  const params = useParams();
  const [countryDetails, setcountryDetails] = useState({});
  const [mode, setmode] = useState("dark");

  const searchCount = (name) =>
  {
    request
    .get(name)
    .then((data) => {
      setcountryDetails(data.body[0]);
      console.log(data.body[0]);
    })
    .catch((error) => {
      //console.log(error);
      alert(error.message);
    });
  }

  const searchBor = () => {
    let text = document.querySelector( '.detail-bor' ).innerText;
    let url = `https://restcountries.com/v2/alpha?codes=${ text }`
    searchCount( url );
  }

  useEffect( () =>
  {
    let url = `https://restcountries.com/v2/name/${params.name}`
   searchCount(url)
  }, [params]);

  const mod = (mod) => {
    setmode(mod);
  };

  return (
    <div
      id="detail-con"
      style={
        mode === "light"
          ? {
              backgroundColor: colors.lightModeBackground,
              color: colors.lightModeText,
            }
          : {
              backgroundColor: colors.darkModeBackground,
              color: colors.darkModeText,
            }
      }
    >
      <Nav mod={mod} />
      <div id="back-btn-con">
        <Link to="/">
          <button
            id="back-btn"
            style={
              mode === "light"
                ? {
                    backgroundColor: colors.lightModeElements,
                    color: colors.lightModeText,
                    boxShadow: `0px 0px 10px -5px grey`,
                  }
                : {
                    backgroundColor: colors.darkModeElements,
                    color: colors.darkModeText,
                    boxShadow: `0px 0px 10px -5px black`,
                  }
            }
          >
            <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: 10 }} />
            Back
          </button>
        </Link>
      </div>

      <div id="country-det">
        <div id="detail-img-con">
          <img
            className="detail-img"
            src={
              Object.keys(countryDetails).length === 0
                ? ""
                : countryDetails.flags.png
            }
            alt="Could not generate img"
          />
        </div>
        <div id="detail-text-con">
          <p className="detail-text-name">{countryDetails.name}</p>
          <br></br>
          <div id="detail-text-details-con">
            <div id="detail-text-details-con-1">
              <p className="card-text-2">
                <b>Native Name: </b>
                {countryDetails.nativeName ? countryDetails.nativeName : <></>}
              </p>
              <p className="card-text-2">
                <b>Population: </b>
                {countryDetails.population ? countryDetails.population.toLocaleString() : <></>}
              </p>
              <p className="card-text-2">
                <b>Region: </b>
                {countryDetails.region ? countryDetails.region : <></>}
              </p>
              <p className="card-text-2">
                <b>Sub Region: </b>
                {countryDetails.subregion ? countryDetails.subregion : <></>}
              </p>
              <p className="card-text-2">
                <b>Capital: </b>
                {countryDetails.capital ? countryDetails.capital : <></>}
              </p>
            </div>
            <div id="detail-text-details-con-2">
              <p className="card-text-2">
                <b>Top Level Domain: </b>
                {!countryDetails.topLevelDomain ? (
                  <></>
                ) : (
                  countryDetails.topLevelDomain.map((top, i) => {
                    return <>{top} </>;
                  })
                )}
              </p>
              <p className="card-text-2">
                <b>Currencies: </b>
                {!countryDetails.currencies ? (
                  <></>
                ) : (
                  countryDetails.currencies.map((top, i) => {
                    return <>{top.name}, </>;
                  })
                )}
              </p>
              <p className="card-text-2">
                <b>Languages: </b>
                {!countryDetails.languages ? (
                  <></>
                ) : (
                  countryDetails.languages.map((top, i) => {
                    return <>{top.name}, </>;
                  })
                )}
              </p>
            </div>
          </div>
          <br></br>
          <br></br>
          <p className="detail-text-2">
            <b style={{marginBottom: 20}}>Border Countries: </b>
            <span>
            {countryDetails.borders ? (
              <>
                {countryDetails.borders.map((border, i) => {
                  return (
                    <span
                      key={i}
                      className="detail-bor"
                      value={ border }
                      onClick={searchBor}
                      style={
                        mode === "light"
                          ? {
                              backgroundColor: colors.lightModeElements,
                              color: colors.lightModeText,
                              boxShadow: `0px 0px 10px -5px grey`,
                            }
                          : {
                              backgroundColor: colors.darkModeElements,
                              color: colors.darkModeText,
                              boxShadow: `0px 0px 10px -5px black`,
                            }
                      }
                    >
                      {border}
                    </span>
                  );
                })}
              </>
            ) : (
              <></>
            )}</span>
                  </p>
                  
        </div>
      </div>
    </div>
  );
}

export default Detail;
