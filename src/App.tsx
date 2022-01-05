import React, { useEffect } from "react";
import HomePage from "./Components/Pages/HomePage";
import Header from "./Components/Header/Header";
import LoginPage from "./Components/Pages/LoginPage";
import AccountPage from "./Components/Pages/AccountPage";
import CardPage from "./Components/Pages/CardPage";
import { Routes, Route } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "./hooks";
import { addUserLS } from "./store/usersSlice";
import RegistrationPage from "./Components/Pages/RegistrationPage";
import SearchResult from "./Components/SearchResult/SearchResult";
import Footer from "./Components/Footer/Footer";

function App() {
  const { isLogin } = useAppSelector((state) => state.users);
  const { searchValue } = useAppSelector((state) => state.search);
  const dispatch = useAppDispatch();

  const checkSearch = (component: React.ComponentElement<any, any>) => {
    if (searchValue === "") {
      return component;
    } else {
      return <SearchResult />;
    }
  };

  useEffect(() => {
    dispatch(addUserLS());
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={checkSearch(<HomePage />)} />
        <Route path="/search" element={<SearchResult />} />
        <Route
          path="/registration"
          element={checkSearch(<RegistrationPage />)}
        />
        <Route
          path="/account"
          element={checkSearch(isLogin ? <AccountPage /> : <LoginPage />)}
        />
        <Route path="/login" element={checkSearch(<LoginPage />)} />
        <Route path="/film:id" element={checkSearch(<CardPage />)} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
