import React, { useState } from "react";
import Button from "@mui/material/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Input from "@mui/material/Input";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Offcanvas from "react-bootstrap/Offcanvas";
import SearchIcon from "@mui/icons-material/Search";
import img from "./img/Flag-India.webp";
import { styled, alpha } from "@mui/material/styles";

import InputBase from "@mui/material/InputBase";
import { Link, NavLink } from "react-router-dom";
import "../Component/layout.css";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useEffect } from "react";
import WifiCalling3Icon from "@mui/icons-material/WifiCalling3";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setstoreCity } from "../dataStoreComponent/citySlice";

export default function NabarCompo() {
  const cartItems = useSelector((state) => state.viewCart?.CartItemsQnty);
  const distpatch = useDispatch();
  const citys = useSelector((state) => state.city);
  const location = useLocation();
  const pathName = location.pathname;
  let cartShow = true;
  if (pathName === "/servicedetails" || pathName === "/ViewCart") {
    cartShow = false;
  } else {
    cartShow = true;
  }

  const storedUserDataJSON = sessionStorage.getItem("userdata");
  const [openResetModal, setOpenResetModal] = useState(false);
  const [SearchSubCategory, setSearchSubCategory] = useState("");
  const [isDropdownEnabled, setIsDropdownEnabled] = useState(true);
  let userData = null;
  const [city, setCity] = useState([]);
  const [CategoryData, setCategoryData] = useState([]);
  const [SearchSubCategoryd, setSearchSubCategoryD] = useState([]);
  try {
    userData = JSON.parse(storedUserDataJSON);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    if (pathName === "/") {
      setOpenResetModal(true);
    }
  }, []);
  useEffect(() => {
    getCity();
    getsubcategory();
  }, []);
  const getsubcategory = async () => {
    try {
      let res = await axios.get(
        `https://api.vijayhomeservicebengaluru.in/api/userapp/getappsubcat`
      );

      if ((res.status = 200)) {
        setCategoryData(res.data.subcategory);
      }
    } catch (err) {
      console.log(err, "err while fetching data");
    }
  };
  const handleLogout = () => {
    sessionStorage.removeItem("userdata");
    window.location.reload("/");
  };

  const [selectedOption, setSelectedOption] = useState({
    value: "0",
    text: "Select City",
    icon: (
      <svg id="flag-icons-in" viewBox="0 0 640 480">
        <path fill="#f93" d="M0 0h640v160H0z" />
        <path fill="#fff" d="M0 160h640v160H0z" />
        <path fill="#128807" d="M0 320h640v160H0z" />
        <g transform="matrix(3.2 0 0 3.2 320 240)">
          <circle r="20" fill="#008" />
          <circle r="17.5" fill="#fff" />
          <circle r="3.5" fill="#008" />
          <g id="d">
            <g id="c">
              <g id="b">
                <g id="a" fill="#008">
                  <circle r=".9" transform="rotate(7.5 -8.8 133.5)" />
                  <path d="M0 17.5.6 7 0 2l-.6 5L0 17.5z" />
                </g>
                <use width="100%" height="100%" transform="rotate(15)" />
              </g>
              <use width="100%" height="100%" transform="rotate(30)" />
            </g>
            <use width="100%" height="100%" transform="rotate(60)" />
          </g>
          <use width="100%" height="100%" transform="rotate(120)" />
          <use width="100%" height="100%" transform="rotate(-120)" />
        </g>
      </svg>
    ),
  });

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchSubCategory(searchTerm);
    setIsDropdownEnabled(searchTerm.length === 0);

    const filterData = CategoryData.filter((ele) => {
      const data = ele.subcategory.toLowerCase();
      return data.includes(searchTerm);
    });

    const subcategories = filterData.map((ele) => ele.subcategory);
    setSearchSubCategoryD(subcategories);
  };

  const handleLinkClick = () => {
    if (SearchSubCategory === "" || selectedOption?.city?.length === 0) {
      alert("Please Select city or service");
    }
    setSearchSubCategory("");
  };
  const getCity = async () => {
    try {
      let res = await axios.get(
        "https://api.vijayhomeservicebengaluru.in/api/master/getcity"
      );
      if (res.status === 200) {
        setCity(res.data.mastercity);
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    }
  };

  const handleResetModal = () => {
    setOpenResetModal(true);
  };
  useEffect(() => {
    setSelectedOption((prevSelectedCity) => ({
      ...prevSelectedCity,
      text: citys || "Select City", // Use the city from the Redux store or fallback to "Select City"
    }));
  }, [citys]);
  const handleSubcategorySelect = (e, ele) => {
    e.preventDefault();
    setSearchSubCategory(ele);
    setIsDropdownEnabled(true);
  };

  const handleChange = (e) => {
    // setSelectedOption(e);
    setSelectedOption(selectedOption);

    // Dispatch the action to set the city in the Redux store
    distpatch(setstoreCity(selectedOption.text));
    distpatch(setstoreCity(e.city));
    setOpenResetModal(false);
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary navbg mb-3">
        <Container>
          <Navbar.Brand className="fnt   rounded-lg brd p-1" href="/">
            <img src="./images/vhs.png" alt="" width={50} height={50} />{" "}
            <span className="clrrdd boldt">Vijay Home Services</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end menu">
            <Nav className=" fnt clrrd ">
              <div className="col-md-10 m-auto border">
                <InputBase
                  readOnly
                  value={
                    citys?.city === null || citys?.city === undefined
                      ? "Select City"
                      : citys?.city
                  }
                  startAdornment={
                    <img
                      src={img}
                      width={20}
                      height={20}
                      className="m-1 imgbr custom-dropdown-toggle"
                      alt="Flag"
                    />
                  }
                  endAdornment={
                    <svg
                      style={{ cursor: "pointer" }}
                      className="m-1 "
                      onClick={handleResetModal}
                      height="20"
                      width="25"
                      viewBox="0 0 18 18"
                      aria-hidden="true"
                      focusable="false"
                      class="css-tj5bde-Svg"
                      // class="clrg"
                    >
                      <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                    </svg>
                  }
                />
              </div>
            </Nav>
            <Nav className=" fnt clrrd ">
              <div className=" m-auto border">
                <InputBase
                  readOnly={false}
                  className="linkt"
                  type="text"
                  placeholder="Search for services"
                  value={SearchSubCategory}
                  onChange={(e) => handleSearch(e)}
                  startAdornment={
                    <Link
                      to="/servicedetails"
                      state={{
                        subcategory: SearchSubCategory,
                        SelecteddCity: selectedOption.city,
                      }}
                      key={SearchSubCategory}
                    >
                      <SearchIcon
                        className="m-1 linkt"
                        style={{ fontSize: "23px", cursor: "pointer" }}
                        onClick={handleLinkClick}
                      />
                    </Link>
                  }
                />
                {!isDropdownEnabled && (
                  <div className="drop_dow shadow-sm p-3 mb-5 bg-white rounded">
                    {SearchSubCategoryd?.map((ele) => (
                      <p
                        key={ele}
                        onClick={(e) => handleSubcategorySelect(e, ele)}
                        style={{ cursor: "pointer", color: "black" }}
                      >
                        {ele}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </Nav>

            <Nav className=" fnt clrrd me-2 bordr boldt">Career</Nav>

            {userData !== null && userData !== undefined ? (
              <Nav className=" fnt   p-0 bordr" onClick={handleShow}>
                <AccountCircleIcon className="clrrd me-1" />{" "}
                <span className="me-3 ">{userData.customerName}</span>
              </Nav>
            ) : (
              <>
                <Link className=" fnt clrrd me-2 bordr boldt" to="/login">
                  Login
                </Link>
                <Link className=" fnt clrrd me-2 bordr boldt" to="/register">
                  Register{" "}
                </Link>
              </>
            )}

            <Nav>
              <div className="row">
                <button className="fnt p-1   modal_header fnt14">
                  <span className="me-2">
                    <WifiCalling3Icon style={{ fontSize: "16px" }} />
                  </span>
                  <span>918348745620</span>
                </button>
              </div>
            </Nav>

            <Nav className="ms-5">
              {!cartShow ? (
                <>
                  <ShoppingCartIcon style={{ fontSize: "30px" }} />
                  <p
                    className=" clr2 text-center"
                    style={{
                      width: "22px",
                      height: "23px",
                      borderRadius: "100%",
                      position: "absolute",
                      top: "15%",
                      right: "5.6%",
                    }}
                  >
                    <span className="m-auto text-white fnt14">
                      {!cartItems ? 0 : cartItems}
                    </span>
                  </p>
                </>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
        <Offcanvas placement="end" show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Profile</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <p>Name : {userData?.customerName}</p>
            <p>Contact : {userData?.contactPerson}</p>
          </Offcanvas.Body>
          <div>
            <p
              className="ms-2"
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
            >
              Logout
            </p>
          </div>
        </Offcanvas>
        <Modal open={openResetModal} onClose={handleResetModal}>
          <div className="modal_wrapper select-city-modal">
            <div className="modal_header ">
              <div className="col-12">
                <span>Let's choose</span>
                <p>Your Location</p>
              </div>
            </div>

            <div className="modal_body">
              <div className="title text-center">India</div>
              <div className="row">
                {city.map((city) => {
                  return (
                    <div className="col-lg-2 col-md-3 col-sm-4">
                      <div
                        className="city-name"
                        onClick={() => handleChange(city)}
                      >
                        <img src="" alt="" />

                        <p className="p-1">{city.city}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Modal>
      </Navbar>
    </>
  );
}
