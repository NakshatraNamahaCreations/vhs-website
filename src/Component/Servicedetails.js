import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
// import Header from "./Header";
import NabarCompo from "./navbar";
// import Modal from "@mui/material/Modal";
import { Button, Modal } from "react-bootstrap";
// import CartDetails from "../Pages/ViewCart/Components/CartDetails"
// import  "../Pages/ViewCart/Components/cartdetails.scss"
// import ViewCart from "../Pages/ViewCart/ViewCart";
import "../Component/Servicedetails.css";
import CheckIcon from "@mui/icons-material/Check";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import PeopleIcon from "@mui/icons-material/People";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AddIcon from "@mui/icons-material/Add";

import StarIcon from "@mui/icons-material/Star";
import { SpinnerCircular } from "spinners-react";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Footer from "./Footer";
import Spinner from "react-bootstrap/Spinner";
function Servicedetails() {
  const location = useLocation();
  const { subcategory, SelecteddCity } = location.state || {};

  const [serviceData, setserviceData] = useState([]);
  const [subModel, setsubModel] = useState(false);
  // const [filtersub, setfiltersub] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [Item, setItem] = useState([]);
  const [City, setCity] = useState(null);
  const [OpenViewCartModal, setOpenViewCartModal] = useState(false);
  const [Price, setPrices] = useState(null);
  const [PriceId, setPriceId] = useState(null);
  const [DefaultPrice, setDefaultPrice] = useState(null);
  const [ServiceID, setServiceID] = useState(null);
  const [ServiceIDD, setServiceIDD] = useState(null);
  const [subcategoryVideo, setsubcategoryVideo] = useState([]);
  const [viewmoreCategory, setViewMoreCategory] = useState(false);
  const [ModalSubcategoryView, setModalSubcategoryView] = useState(false);
  const [SelectService, setSelectService] = useState(null);
  const [SelectedCategory, setSelectedCategory] = useState([]);
  const [Added, setAdded] = useState(true);
  const [SelectedIndex, setSelectedIndex] = useState(null);
  const [Quantity, setQuantity] = useState(1);

  useEffect(() => {
    getAllServices();
    getsubcategoryVideo();
    getCity();
  }, []);

  const getAllServices = async () => {
    try {
      setIsLoading(true);

      let res = await axios.get(
        "https://api.vijayhomeservicebengaluru.in/api/userapp/getservices"
      );

      if (res.status === 200) {
        let subcategories = subcategory?.toLowerCase();

        setserviceData(
          res.data.service?.filter((ele) => {
            let category = ele?.Subcategory?.toLowerCase();
            return subcategories?.includes(category);
          })
        );
      }
    } catch (error) {
      console.log(error, "error while fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  const getCity = async () => {
    try {
      setIsLoading(true);
      let res = await axios.get(
        "https://api.vijayhomeservicebengaluru.in/api/master/getcity"
      );
      if (res.status === 200) {
        setCity(res?.data?.mastercity);
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleHrSelect = (sersid, hr) => {
    const filteredData = serviceData
      .filter((ele) => ele._id === sersid)
      .flatMap((ele) => ele.morepriceData.filter((item) => item?._id === hr));
    setServiceIDD(sersid);
    setPrices(filteredData);
    setPriceId(hr);
  };

  useEffect(() => {
    if (serviceData?.length > 0) {
      const allServiceIDs = serviceData.map((service) => service._id);

      if (allServiceIDs?.length > 0) {
        const defaultPrice = serviceData.map((ele) => ele.morepriceData[0]);
        setDefaultPrice(defaultPrice);
      }

      setServiceID(allServiceIDs);
    }
  }, [serviceData]);

  const handleAdd = (e, data, index) => {
    e.preventDefault();
    setSelectedIndex(index);
    setSelectService(data);
    setAdded(false);
    setModalSubcategoryView(false);
    setOpenViewCartModal(true);
    setAdded(true);
  };

  const getsubcategoryVideo = async () => {
    try {
      setIsLoading(true);

      let res = await axios.get(
        "https://api.vijayhomeservicebengaluru.in/api/userapp/getappsubcat"
      );
      if ((res.status = 200)) {
        let subcategorys = subcategory?.toLowerCase();
        let filteredData = res?.data?.subcategory?.filter((Ele) => {
          let videoLink = Ele?.subcategory?.toLowerCase();

          return subcategorys?.includes(videoLink);
        });
        // console.log(res.data.subcategory);
        setsubcategoryVideo(filteredData);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowSelectCategory = (e, selectedsubcategory) => {
    e.preventDefault();
    setViewMoreCategory(false);
    setModalSubcategoryView(true);
    let filteredData = serviceData.filter(
      (servie) => servie._id === selectedsubcategory
    );

    setSelectedCategory(filteredData);
  };
  const handleCloseSubcategoryView = () => {
    setModalSubcategoryView(false);
  };

  const [catType, setcatType] = useState(null);
  const [activeIndex, setActiveIndex] = useState(false);
  const [activeIndex2, setActiveIndex2] = useState(null);
  const toggleAccordion1 = (e, cate, index) => {
    e.preventDefault();
    setcatType(cate);
    setActiveIndex(!activeIndex);
    setActiveIndex2(index);
  };

  const handleCloseCart = () => {
    // e.preventDefault();
    setOpenViewCartModal(false);
  };

  let SelectedService = serviceData
    .map((serivice) =>
      serivice.morepriceData.filter((paln) => paln._id === SelectService)
    )
    .flatMap((cart) => cart);

  return (
    <>
      {isLoading ? (
        <div className="row m-auto text-center" style={{ height: "100vh" }}>
          <div className="col-md-4"></div>
          <div className="col-md-4 m-auto ">
            <SpinnerCircular
              size={90}
              thickness={87}
              speed={80}
              color="rgba(27, 22, 22, 1)"
              secondaryColor="rgba(214, 191, 91, 1)"
            />
          </div>

          <div className="col-md-4"></div>
        </div>
      ) : (
        <>
          {" "}
          <NabarCompo />
          <div className="row align-items-center m-auto">
            <p className="col-md-2"></p>
            <span className="col-md-2 hrline"></span>
            <h4 className="col-md-4 m-auto fnt text-center boldt grndclr text-black">
              {subcategory}
            </h4>{" "}
            <span className="col-md-2 m-auto hrline"></span>
            <p className="col-md-2"></p>
          </div>
          <div className="row  mt-3 m-auto">
            <div className="col-md-6 p-5">
              <div className="row mt-3 container_proud crdbor shadow p-3 mb-5 cntbglcr ">
                {serviceData?.map((service, index) => (
                  <div className="col-md-4 ">
                    <div className="row  ">
                      <div className="col-md-10 ">
                        <Link
                          className="linkt"
                          onClick={(e) =>
                            handleShowSelectCategory(e, service._id)
                          }
                        >
                          <div className="row  shadow-sm  text-center bg-white  subimg1 p-2">
                            <img
                              className="subimg  p-0 m-auto    bg-white  "
                              height={120}
                              width={120}
                              alt=""
                              src={`https://api.vijayhomesuperadmin.in/service/${service?.serviceImg}`}
                            />{" "}
                          </div>
                          <p className="row fnt12 text-center m-auto p-2 boldt">
                            {service.serviceName}
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* <div className="col-md-1"></div> */}
            <div className="col-md-6 m-auto p-5 ">
              <div className="row  mb-4 p-0 brdrdds">
                {subcategoryVideo &&
                  subcategoryVideo.map((Ele) => {
                    return (
                      <video
                        className="p-0"
                        style={{ objectFit: "cover", width: "100%" }}
                        height={400}
                        autoPlay
                        loop
                        src={`https://api.vijayhomesuperadmin.in/subcat/${Ele.subcatvideo}`}
                      ></video>
                    );
                  })}
              </div>

              <div className="row bgclr p-2">
                <div className="row m-auto">
                  <h6
                    className=" fnt boldt p-0  "
                    style={{
                      borderBottom: "2px solid black",
                      width: "fit-content",
                      marginRight: "1px",
                    }}
                  >
                    Book Our Service
                  </h6>
                  ,
                  <h6
                    className=" fnt boldt p-0  "
                    style={{
                      borderBottom: "2px solid black",
                      width: "fit-content",
                      marginRight: "1px",
                    }}
                  >
                    Let the
                  </h6>{" "}
                  ,
                  <h6
                    className=" fnt boldt p-0  "
                    style={{
                      borderBottom: "2px solid black",
                      width: "fit-content",
                      marginRight: "1px",
                    }}
                  >
                    Good times roll.
                  </h6>
                </div>
                <div className="row m-auto mb-3 ">
                  <span>
                    <StarIcon className="clrstr" />
                    <StarIcon className="clrstr" />
                    <StarIcon className="clrstr" />
                    <StarIcon className="clrstr" />
                    <StarHalfIcon className="clrstr" />
                    <span className="fnt " style={{ fontSize: "14px" }}>
                      {" "}
                      4.9 (7k+ Reviews | 31 Lakh + Happy Customer)
                    </span>
                  </span>
                </div>
                <div className="row m-auto">
                  <img
                    className="col-md-1 strclr"
                    alt=""
                    width={18}
                    height={18}
                    src="./Newimg/728673.png"
                  />

                  <p className="col-md-11">
                    Lowest Price in Market || ISO Certified Company
                  </p>
                </div>
                <div className="row m-auto">
                  <img
                    className="col-md-1 strclr"
                    alt=""
                    width={18}
                    height={18}
                    src="./Newimg/728673.png"
                  />

                  <p className="col-md-11">
                    Lowest Price in Market || ISO Certified Company
                  </p>
                </div>
                <div className="row m-auto">
                  <img
                    className="col-md-1 strclr"
                    alt=""
                    width={18}
                    height={18}
                    src="./Newimg/728673.png"
                  />

                  <p className="col-md-11">100% Satisfaction or FREE Network</p>
                </div>
                <div className="row m-auto">
                  <img
                    className="col-md-1 strclr"
                    alt=""
                    width={18}
                    height={18}
                    src="./Newimg/728673.png"
                  />

                  <p className="col-md-11">
                    Trained Professionals | No Sub Contract
                  </p>
                </div>
                <div className="row m-auto">
                  <img
                    className="col-md-1 strclr"
                    alt=""
                    width={18}
                    height={18}
                    src="./Newimg/728673.png"
                  />

                  <p className="col-md-11">
                    Trusted By 31+ Lakh customers | 15+ Years
                  </p>
                </div>
              </div>
            </div>
          </div>{" "}
          <Footer />
        </>
      )}
      <Modal
        size="lg"
        className=""
        show={ModalSubcategoryView}
        onHide={handleCloseSubcategoryView}
      >
        <Modal.Header closeButton>
          {SelectedCategory.map((Ele) => (
            <Modal.Title className="container ">
              {" "}
              {Ele?.serviceName}
            </Modal.Title>
          ))}
        </Modal.Header>
        <Modal.Body className="bgclr">
          {SelectedCategory?.map((servi, index) => {
            return (
              <>
                <Link
                  to="/servicedetails"
                  state={{ subcategory: servi?.subcategory }}
                  key={servi.subcategory}
                  style={{ textDecoration: "none" }}
                  className="text-decoration-none  text-black"
                >
                  {" "}
                  <div className="row  justify-content-center">
                    {servi.morepriceData.map((plan, innerindex) => (
                      <div className="col-md-3 m-3 shadow-lg bg-white p-2 brdrd   mb-2 ">
                        <div className="row  m-auto">
                          <p className="col-md-12 p-4 clrstr2  text-white shadow-sm ">
                            {plan.pName}
                          </p>
                        </div>
                        <p className="row">
                          <span>
                            {" "}
                            <StarIcon className="clrstr" /> 7k + Reviews
                          </span>{" "}
                        </p>
                        <div className="row mt-5 p-1">
                          <span className="col-md-6 m-auto   price fntbold">
                            Rs. {plan?.pPrice}
                          </span>
                          <span className="col-md-6 m-auto  fntbold  clrstr">
                            Rs. {plan?.pofferprice}
                          </span>
                        </div>
                        <div className="row">
                          <button
                            onClick={(e) => handleAdd(e, plan._id, innerindex)}
                            className="col-md-6 m-auto  fntbold text-center p-1  fnts btn_clr   "
                          >
                            {Added || innerindex !== SelectedIndex ? (
                              <>
                                <span>
                                  <AddIcon style={{ fontSize: "14px" }} />{" "}
                                </span>
                                <span>Add </span>
                              </>
                            ) : (
                              <>
                                <span>
                                  {" "}
                                  <CheckIcon
                                    style={{ fontSize: "14px" }}
                                  />{" "}
                                </span>
                                <span>Added </span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Link>
                <div className="container redbrdr  mt-3 shadow-sm acordinss p-3">
                  <div key={index} className="row  m-2">
                    {servi?.serviceIncludes?.length > 0 && (
                      <p
                        className={`m-auto col-md-6 accordion ${
                          catType === "includes" && activeIndex2 === 0
                            ? "active"
                            : ""
                        }`}
                        onClick={(e) => toggleAccordion1(e, "includes", 0)}
                      >
                        <p
                          className="accordion__title clrpr"
                          style={{
                            fontWeight: "bold",
                            padding: "16px 0px 0px 6px",
                          }}
                        >
                          Includes
                        </p>
                      </p>
                    )}
                    {servi?.serviceExcludes?.length > 0 && (
                      <p
                        className={`m-auto col-md-6 accordion ${
                          catType === "excludes" && activeIndex2 === 1
                            ? "active"
                            : ""
                        }`}
                        onClick={(e) => toggleAccordion1(e, "excludes", 1)}
                      >
                        <p
                          className="accordion__title clrpr"
                          style={{
                            fontWeight: "bold",
                            padding: "16px 0px 0px 6px",
                          }}
                        >
                          Excludes
                        </p>
                      </p>
                    )}

                    <div className="row ">
                      {catType === "includes" && activeIndex2 === 0 && (
                        <div
                          style={{
                            maxHeight: `${activeIndex ? "1000px" : "0px"}`,
                          }}
                          className="accordion__content"
                        >
                          {servi.serviceIncludes.map((dos, dosIndex) => (
                            <div
                              key={dosIndex}
                              className="accordion__text clrpr"
                            >
                              <li>{dos.text}</li>
                            </div>
                          ))}
                        </div>
                      )}
                      {catType === "excludes" && activeIndex2 === 1 && (
                        <div
                          style={{
                            maxHeight: `${activeIndex ? "1000px" : "0px"}`,
                          }}
                          className="accordion__content"
                        >
                          {servi?.serviceExcludes?.map((dos, dosIndex) => (
                            <div
                              key={dosIndex}
                              className="accordion__text clrpr"
                            >
                              <li>{dos.text}</li>
                            </div>
                          ))}
                        </div>
                      )}{" "}
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </Modal.Body>
        <Modal.Footer className="container ">
          <Button
            className="col-md-2"
            variant="secondary"
            onClick={handleCloseSubcategoryView}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal size="lg" show={OpenViewCartModal} onHide={handleCloseCart}>
        <Modal.Header closeButton>
          <h1 className=" clrstr fnt">Cart</h1>
        </Modal.Header>
        <Modal.Body>
          {SelectedService.map((price) => {
            return (
              <div className="row p-4">
                <span className="col-md-4 col-md-4 fs-5 m-auto  fntbold  ">
                  {price.pName}
                </span>

                <Button variant="secondary" className="col-md-2 m-auto  p-0">
                  <span
                    onClick={() => {
                      if (Quantity > 1) {
                        setQuantity(Quantity - 1);
                      }
                    }}
                    className="me-2 fs-5 p-0"
                  >
                    -
                  </span>
                  <span className="me-2 ms-2 fs-5 p-0">{Quantity} </span>
                  <span
                    className="ms-2 fs-5 p-0"
                    onClick={() => setQuantity(Quantity + 1)}
                  >
                    +
                  </span>
                </Button>
                <span className="col-md-2"></span>
                <span span className="col-md-2 m-auto  ">
                  <span className="fs-3 fntbold  clrstr">
                    Rs.{price.pofferprice}
                  </span>
                </span>
              </div>
            );
          })}
        </Modal.Body>
        <Modal.Footer className="container p-3 ">
          {serviceData.flatMap((service) =>
            service.morepriceData
              .filter((plan) => plan._id === SelectService)

              .map((price) => (
                <Button
                  className="col-md-10 m-auto clrstrs"
                  onClick={() => {
                    // e.preventDefault();
                    setOpenViewCartModal(false);
                  }}
                >
                  {" "}
                  <Link
                    to="/ViewCart"
                    state={{
                      ServiceIDD: service._id,
                      PriceID: price._id,
                      NumberOfQunt: Quantity,
                    }}
                    style={{
                      textDecoration: "none",
                      color: "white",
                      border: "none",
                    }}
                  >
                    <p className="row p-1 m-auto">
                      <span className="col-md-6 m-auto p-0">View Cart</span>
                      <span className="col-md-6 m-auto p-0">
                        {" "}
                        Rs.{price.pofferprice}
                      </span>
                    </p>
                  </Link>
                </Button>
              ))
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Servicedetails;
