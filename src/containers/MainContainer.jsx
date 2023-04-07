import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import MoviesContainer from "./MoviesContainer.jsx";
import CastsContainer from "./CastsContainer.jsx";
import NavContainer from "./NavContainer.jsx";
import PreviewContainer from "./PreviewContainer.jsx";
import Styles from "./MainContainer.module.css";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";

export default function MainContainer(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    return fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=2824910ce318ceabd50d2661187c1b9e&page=1",
      requestOptions
    )
      .then((response) => response.json())
      .then((movies) => {
        dispatch({ type: "GET_MOVIE", payload: movies });
      })
      .catch((error) => console.log("error fetching", error));
  }, [dispatch]);

  return (
    <HashRouter>
      <div className={Styles.container}>
        <div className="outerBox">
          <NavContainer />
          <PreviewContainer />
          <Routes>
            <Route exact path="" element={<MoviesContainer />} />
            <Route
              path="moviecast/movie/:id/casts"
              element={<CastsContainer />}
            />
          </Routes>
        </div>
      </div>
    </HashRouter>
  );
}
