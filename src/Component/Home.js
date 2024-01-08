import React, { useState, useEffect } from "react";
// import Card from "react-bootstrap/Card";
import "../Component/layout.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import axios from "axios";
// import Review from "./review";
import { SpinnerCircular } from "spinners-react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import NabarCompo from "./navbar";
import "./layout.css";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Footer from "./Footer";
import Spinner from "react-bootstrap/Spinner";
export default function Home() {
  const [Banner, setBanner] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [category, setCategory] = useState([]);

  const [FilteredCategory, setFilteredCategory] = useState([]);

  const [FilteredPaint, setFilteredPaint] = useState([]);

  const [FilterCleaning, setFilterCleaning] = useState([]);

  const [FilterPestControl, setFilterPestControl] = useState([]);
  const [FilterMarbelPolish, setFilterMarbelPolish] = useState([]);
  const [FilterRepairing, setFilterRepairing] = useState([]);
  const [SelectedCategory, setSelectedCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    GetAllWebBanner();
    getAllCategory();
  }, []);

  const GetAllWebBanner = async () => {
    try {
      setIsLoading(true);
      let res = await axios.get(
        "https://api.vijayhomeservicebengaluru.in/api/website/getallwebbanner"
      );

      if (res.status === 200) {
        setBanner(res.data.banner);
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getsubcategory();
  }, []);

  const getsubcategory = async () => {
    try {
      setIsLoading(true);

      let res = await axios.get(
        `https://api.vijayhomeservicebengaluru.in/api/userapp/getappsubcat`
      );

      if ((res.status = 200)) {
        setCategoryData(res.data.subcategory);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllCategory = async () => {
    try {
      setIsLoading(true);
      let res = await axios.get(
        "https://api.vijayhomeservicebengaluru.in/api/getcategory"
      );
      if (res.status === 200) {
        if (res.data.category.length === 0) {
          setIsLoading(true);
        } else {
          setCategory(res.data.category);
          setIsLoading(false);
        }
      }
    } catch (er) {
      console.log(er, "err while fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  const justforyou = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "ease-in-out",
  };
  const [showModal, setShowModal] = useState(false);

  const filteredCleaning = categoryData.filter((cat) =>
    cat.category.toLowerCase().includes("cleaning")
  );
  const [viewmoreCategory, setViewMoreCategory] = useState(false);
  const handleViewMoreCategory = () => {
    setViewMoreCategory(true);
  };

  const handleViewLessCategory = () => {
    setViewMoreCategory(false);
  };
  const filteredPaint = categoryData.filter((cat) =>
    cat.category.toLowerCase().includes("painting")
  );
  const filteredpestc = categoryData.filter((cat) =>
    cat.category.toLowerCase().includes("control")
  );
  const filtermarbel = categoryData.filter((cat) =>
    cat.category.toLowerCase().includes("polishing")
  );
  const FacilityManagement = categoryData.filter(
    (cat) =>
      cat.category.toLowerCase().includes("management") ||
      cat.category.toLowerCase().includes("corporate")
  );

  const Repairing = categoryData.filter((cat) =>
    cat.category.toLowerCase().includes("repair")
  );
  useEffect(() => {
    setFilteredCategory(viewmoreCategory ? category : category.slice(0, 7));
    setFilterCleaning(filteredCleaning.slice(0, 7));
    setFilteredPaint(filteredPaint.slice(0, 7));

    setFilterPestControl(filteredpestc.slice(0, 7));
    setFilterMarbelPolish(filtermarbel.slice(0, 7));
    setFilterRepairing(Repairing.slice(0, 7));
  }, [
    category,
    viewmoreCategory,
    filteredCleaning,
    filteredPaint,
    filteredpestc,
    filtermarbel,
    Repairing,
  ]);
  const MODAL_TYPE = {
    CLEANING: "CLEANING",
    PAINT: "PAINT",
    PEST_CONTROL: "PEST_CONTROL",
    MARBEL: "MARBEL",
    REPAIRING: "REPAIRING",
  };
  const [filteredData, setFilteredData] = useState([]);
  const [ModalSubcategoryView, setModalSubcategoryView] = useState(false);
  const [CateGoryName, setCateGoryName] = useState(null);

  const handleCloseSubcategoryView = () => {
    setModalSubcategoryView(false);
  };
  const handleViewMore = (modalType) => {
    setShowModal(true);
    switch (modalType) {
      case MODAL_TYPE.CLEANING:
        setFilteredData(filteredCleaning);
        break;
      case MODAL_TYPE.PAINT:
        setFilteredData(filteredPaint);
        break;
      case MODAL_TYPE.PEST_CONTROL:
        setFilteredData(filteredpestc);
        break;
      case MODAL_TYPE.MARBEL:
        setFilteredData(filtermarbel);
        break;
      case MODAL_TYPE.REPAIRING:
        setFilteredData(Repairing);
        break;

      default:
        break;
    }
  };
  const handleShowSelectCategory = (selectedcategory) => {
    setViewMoreCategory(false);
    setCateGoryName(selectedcategory);
    setModalSubcategoryView(true);
    const item = selectedcategory.toLowerCase();

    let filteredData = categoryData.filter((cat) =>
      cat.category.toLowerCase().includes(item)
    );

    setSelectedCategory(filteredData);
  };

  return (
    <>
      {isLoading ? (
        <>
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
        </>
      ) : (
        <>
          <NabarCompo />
          <div className="container mb-5">
            <div className="row align-items-center m-auto">
              <span className="col-md-2 hrline"></span>
              <h3 className="col-md-8 m-auto fnt boldt text-center text-black">
                Bring Professionals Home Services To Your Door
              </h3>{" "}
              <span className="col-md-2 m-auto hrline"></span>
            </div>
          </div>
          <div className="container ">
            <div className="row mb-5">
              <div className="col-md-6">
                <div className="row m-auto">
                  {FilteredCategory?.map((ele, index) => (
                    <div className="col-md-4 ">
                      <div className="row text-center m-auto">
                        <Link
                          className="linkt"
                          onClick={() => handleShowSelectCategory(ele.category)}
                        >
                          <div className="col-md-10">
                            <img
                              className="mb-3"
                              width={50}
                              height={50}
                              alt=""
                              src={`https://api.vijayhomesuperadmin.in/category/${ele?.categoryImg}`}
                            />
                            <p className="fnt col-md-12 boldt fnt15">
                              {ele.category}
                            </p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                  <div className="col-md-2 text-center">
                    {FilteredCategory.length >= 4 && (
                      <img
                        className="m-auto"
                        width={60}
                        height={60}
                        onClick={handleViewMoreCategory}
                        alt=""
                        src="..\Newimg\Untitled-1-01.png"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="col-md-6 ">
                <div className="row  clr2">
                  <div
                    className="col-md-3 m-auto"
                    style={{ position: "absolute", top: "145px" }}
                  >
                    <img
                      alt=""
                      style={{ position: "relative", height: "236px" }}
                      src="./Newimg/vhs.png"
                      className="brd "
                    />{" "}
                  </div>
                  <div className="col-md-3"></div>
                  <div className="col-md-6 text-center m-auto">
                    <div className="row  m-auto  mb-3 mt-3">
                      <img
                        width={30}
                        height={40}
                        alt=""
                        className="col-md-3  m-auto "
                        src="./images/vhs.png"
                      />
                    </div>
                    <p className="col-md-10 fs-5 text-white m-auto mb-3 ">
                      Diwali Special Cleaning Starting at ₹1200
                    </p>
                    <div className="row mb-3  m-auto">
                      <div className="col-md-6"></div>
                      <button className="col-md-4  fnt fnt14 p-1 boldt text-black bg-white">
                        BOOK NOW
                      </button>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-evenly  m-auto">
                  {" "}
                  <video
                    alt=""
                    autoPlay
                    loop
                    className="col-md-5   mt-4 brd border5 p-0"
                    src="./Newimg/cln.mp4"
                  ></video>
                  <video
                    alt=""
                    autoPlay
                    loop
                    className="col-md-5   mt-4 brd border5 p-0"
                    src="./Newimg/paint.mp4"
                  ></video>
                </div>
              </div>
            </div>

            <div className="row mt-5 mb-5 slick-listsd">
              <Slider {...justforyou} className="mt-5 mb-5">
                {Banner.map((item) => (
                  <div key={item._id} className="col-md-3 mb-3  m-auto">
                    <img
                      className="col-md-11    shadow-sm   bg-white rdi m-auto  "
                      height={150}
                      src={`https://api.vijayhomesuperadmin.in/webBanner/${item.banner}`}
                      alt=""
                    />
                  </div>
                ))}
              </Slider>
            </div>

            <div className="row mt-5 mb-5  brclr ">
              <div className="col-md-4 p-3 crdbor">
                <h3 className="text-center m-auto boldt">Cleaning Services</h3>
                <p className="text-center  m-auto grndclr fnt12 boldt">
                  30% Less Than Market Price
                </p>
                <img
                  className="row mt-2  border1 m-auto"
                  alt=""
                  height={400}
                  width={300}
                  src="./Newimg/cleanbnr.jpg"
                />
              </div>

              <div className="col-md-8 p-4">
                <div className="row m-auto">
                  {FilterCleaning?.map((ele, index) => (
                    <div className="col-md-3 ">
                      <div className="row  mb-4">
                        <div className="col-md-10 ">
                          <Link
                            to="/servicedetails"
                            state={{ subcategory: ele?.subcategory }}
                            key={ele.subcategory}
                            style={{ textDecoration: "none" }}
                            className="text-decoration-none text-black"
                          >
                            <div className="row mb-2 shadow-sm  bg-white  subimg1 p-2">
                              <img
                                className="subimg p-0   bg-white  "
                                width={130}
                                height={130}
                                alt=""
                                src={`https://api.vijayhomesuperadmin.in/subcat/${ele?.subcatimg}`}
                              />{" "}
                            </div>
                            <p className="row fnt12 text-center m-auto p-2 boldt">
                              {ele.subcategory}
                            </p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="col-md-3 m-auto text-center ">
                    {FilterCleaning.length >= 6 && (
                      <button
                        className="clr2 p-2  borderrad "
                        onClick={() => handleViewMore(MODAL_TYPE.CLEANING)}
                      >
                        View All <ArrowForwardIcon />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-5 mb-5  brclr ">
              <div className="col-md-4 p-3 crdbor">
                <h3 className="text-center m-auto boldt">Painting Services</h3>
                <p className="text-center  m-auto grndclr fnt12 boldt">
                  Asian Paints Certified
                </p>
                <img
                  className="row mt-2  border1 m-auto"
                  alt=""
                  height={400}
                  width={300}
                  src="./Newimg/pexels-piotr-arnoldes-6057911.jpg"
                />
              </div>

              <div className="col-md-8 p-4">
                <div className="row m-auto">
                  {FilteredPaint?.map((ele, index) => (
                    <div className="col-md-3 ">
                      <div className="row  ">
                        <div className="col-md-10 ">
                          <Link
                            to="/servicedetails"
                            state={{ subcategory: ele?.subcategory }}
                            key={ele.subcategory}
                            style={{ textDecoration: "none" }}
                            className="text-decoration-none text-black"
                          >
                            <div className="row mb-2 shadow-sm  bg-white  subimg1 p-2">
                              <img
                                className="subimg p-0   bg-white  "
                                width={130}
                                height={130}
                                alt=""
                                src={`https://api.vijayhomesuperadmin.in/subcat/${ele?.subcatimg}`}
                              />{" "}
                            </div>
                            <p className="row fnt12 text-center m-auto p-2 boldt">
                              {ele.subcategory}
                            </p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="col-md-3 m-auto text-center ">
                    {FilteredPaint.length >= 6 && (
                      <button
                        className="clr2 p-2  borderrad "
                        onClick={() => handleViewMore(MODAL_TYPE.PAINT)}
                      >
                        View All <ArrowForwardIcon />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-5  mb-5  brclr ">
              <div className="col-md-4 p-3 crdbor">
                <h3 className="text-center m-auto boldt">
                  Pest Control Services
                </h3>
                <p className="text-center  m-auto grndclr fnt12 boldt">
                  Approved Government Licence
                </p>
                <img
                  className="row mt-2  border1 m-auto"
                  alt=""
                  height={400}
                  width={300}
                  src="./Newimg/pestctl.jpg"
                />
              </div>

              <div className="col-md-8 p-4">
                <div className="row m-auto">
                  {FilterPestControl?.map((ele, index) => (
                    <div className="col-md-3 ">
                      <div className="row  ">
                        <div className="col-md-10 ">
                          <Link
                            to="/servicedetails"
                            state={{ subcategory: ele?.subcategory }}
                            key={ele.subcategory}
                            style={{ textDecoration: "none" }}
                            className="text-decoration-none text-black"
                          >
                            <div className="row mb-2 shadow-sm  bg-white  subimg1 p-2">
                              <img
                                className="subimg p-0   bg-white  "
                                width={130}
                                height={130}
                                alt=""
                                src={`https://api.vijayhomesuperadmin.in/subcat/${ele?.subcatimg}`}
                              />{" "}
                            </div>
                            <p className="row fnt12 text-center m-auto p-2 boldt">
                              {ele.subcategory}
                            </p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="col-md-3 m-auto text-center ">
                    {FilterPestControl.length >= 6 && (
                      <button
                        className="clr2 p-2  borderrad "
                        onClick={() => handleViewMore(MODAL_TYPE.PEST_CONTROL)}
                      >
                        View All <ArrowForwardIcon />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-5  mb-5  brclr ">
              <div className="col-md-4 p-3 crdbor">
                <h3 className="text-center m-auto boldt">Marbel Polish</h3>
                <p className="text-center  m-auto grndclr fnt12 boldt">
                  Trained And Expert Team
                </p>
                <img
                  className="row mt-2  border1 m-auto"
                  alt=""
                  height={400}
                  width={300}
                  src=".\Newimg\marbel.jpg"
                />
              </div>

              <div className="col-md-8 p-4">
                <div className="row m-auto">
                  {FilterMarbelPolish?.map((ele, index) => (
                    <div className="col-md-3 ">
                      <div className="row  ">
                        <div className="col-md-10 ">
                          <Link
                            to="/servicedetails"
                            state={{ subcategory: ele?.subcategory }}
                            key={ele.subcategory}
                            style={{ textDecoration: "none" }}
                            className="text-decoration-none text-black"
                          >
                            <div className="row mb-2 shadow-sm  bg-white  subimg1 p-2">
                              <img
                                className="subimg p-0   bg-white  "
                                width={130}
                                height={130}
                                alt=""
                                src={`https://api.vijayhomesuperadmin.in/subcat/${ele?.subcatimg}`}
                              />{" "}
                            </div>
                            <p className="row fnt12 text-center m-auto p-2 boldt">
                              {ele.subcategory}
                            </p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="col-md-3 m-auto text-center ">
                    {FilterMarbelPolish.length >= 6 && (
                      <button
                        className="clr2 p-2  borderrad "
                        onClick={() => handleViewMore(MODAL_TYPE.MARBEL)}
                      >
                        View All <ArrowForwardIcon />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-5  ">
              <h2 className="row">Corporate Facility Management</h2>
            </div>
            <div className="row mb-5 brclr1 p-4">
              {FacilityManagement?.map((ele, index) => (
                <div className="col-md-2 ">
                  <div className="row  ">
                    <div className="col-md-10">
                      <Link
                        to="/servicedetails"
                        state={{ subcategory: ele?.subcategory }}
                        key={ele.subcategory}
                        style={{ textDecoration: "none" }}
                        className="text-decoration-none text-black"
                      >
                        <img
                          className=" p-0 subimg3 shadow"
                          width={130}
                          height={130}
                          alt=""
                          src={`https://api.vijayhomesuperadmin.in/subcat/${ele?.subcatimg}`}
                        />{" "}
                        <p className="row fnt12 text-center m-auto p-2 boldt">
                          {ele.subcategory}
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="mt-5 boldt">Repairing Services</h3>
            <div className="row   mb-5  brclr2 ">
              <div className="col-md-4 ">
                <img
                  className="row p-0  crdbor1"
                  alt=""
                  height={400}
                  width={300}
                  src=".\Newimg\marbel.jpg"
                />
              </div>

              <div className="col-md-8 p-3">
                <div className="row m-auto">
                  {FilterRepairing?.map((ele, index) => (
                    <div className="col-md-3 ">
                      <div className="row  ">
                        <div className="col-md-10">
                          <Link
                            to="/servicedetails"
                            state={{ subcategory: ele?.subcategory }}
                            key={ele.subcategory}
                            style={{ textDecoration: "none" }}
                            className="text-decoration-none text-black"
                          >
                            <img
                              className=" p-0 subimg3 shadow"
                              width={130}
                              height={130}
                              alt=""
                              src={`https://api.vijayhomesuperadmin.in/subcat/${ele?.subcatimg}`}
                            />{" "}
                            <p className="row fnt12 text-center m-auto p-2 boldt">
                              {ele.subcategory}
                            </p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="col-md-3 m-auto text-center ">
                    {FilterRepairing.length >= 6 && (
                      <button
                        className="clr2 p-2  borderrad "
                        onClick={() => handleViewMore(MODAL_TYPE.REPAIRING)}
                      >
                        View All <ArrowForwardIcon />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />{" "}
        </>
      )}
      <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>All Sub Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row m-auto p-4">
            {filteredData?.map((ele, index) => (
              <div className="col-md-3 ">
                <div className="row  mb-4">
                  <div className="col-md-10 ">
                    <Link
                      to="/servicedetails"
                      state={{ subcategory: ele?.subcategory }}
                      key={ele.subcategory}
                      style={{ textDecoration: "none" }}
                      className="text-decoration-none text-black"
                    >
                      <div className="row mb-2 shadow-sm  bg-white  subimg1 p-2">
                        <img
                          className="subimg p-0   bg-white  "
                          width={120}
                          height={120}
                          alt=""
                          src={`https://api.vijayhomesuperadmin.in/subcat/${ele?.subcatimg}`}
                        />{" "}
                      </div>
                      <p className="row fnt12 text-center m-auto p-2 boldt">
                        {ele.subcategory}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="col-md-2"
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal size="lg" show={viewmoreCategory} onHide={handleViewLessCategory}>
        <Modal.Header closeButton>
          <Modal.Title>All Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row p-4">
            {FilteredCategory?.map((ele, index) => (
              <div className="col-md-4 ">
                <div className="row">
                  <Link
                    className="linkt"
                    onClick={() => handleShowSelectCategory(ele.category)}
                  >
                    <div className="col-md-10">
                      <img
                        className="mb-3"
                        width={60}
                        height={60}
                        alt=""
                        src={`https://api.vijayhomesuperadmin.in/category/${ele?.categoryImg}`}
                      />
                      <p className="fnt col-md-10">{ele.category}</p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="col-md-2"
            variant="secondary"
            onClick={handleViewLessCategory}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        size="lg"
        show={ModalSubcategoryView}
        onHide={handleCloseSubcategoryView}
      >
        <Modal.Header closeButton>
          <Modal.Title>All Subcategory Of {CateGoryName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row p-4">
            {SelectedCategory?.map((ele, index) => (
              <div className="col-md-3 ">
                <div className="row  mb-4">
                  <div className="col-md-10 ">
                    <Link
                      to="/servicedetails"
                      state={{ subcategory: ele?.subcategory }}
                      key={ele.subcategory}
                      style={{ textDecoration: "none" }}
                      className="text-decoration-none text-black"
                    >
                      <div className="row mb-2 shadow-sm  bg-white  subimg1 p-2">
                        <img
                          className="subimg p-0   bg-white  "
                          width={120}
                          height={120}
                          alt=""
                          src={`https://api.vijayhomesuperadmin.in/subcat/${ele?.subcatimg}`}
                        />{" "}
                      </div>
                      <p className="row fnt12 text-center m-auto p-2 boldt">
                        {ele.subcategory}
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="col-md-2"
            variant="secondary"
            onClick={handleCloseSubcategoryView}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
