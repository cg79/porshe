import store from "../../store/company/CompaniesStore";
import Router from "next/router";
import { ROUTES } from "../../constants/constants";
import styles from "./company-grid.module.css";
import Link from "next/link";
// import { SwiperComponent } from "./swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectCoverflow,
} from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const numberWithCommas = (number: number) => {
  if (number > 999) {
    let numberT = number / 1000;
    if (numberT > 999) {
      let numberM = Math.round(numberT / 100) / 10;
      return numberM + "m";
    }
    return Math.round(numberT * 10) / 10 + "k";
  }
  return number?.toString();
};

const CompanyGrid = () => {
  const redirectToCompanyDetails = (companyId: number) => {
    const route = `${ROUTES.KPI}?companyId=${companyId}`;
    Router.push(route);
  };

  const width = window.innerWidth;

  if (width <= 600) {
    return (
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow]}
        spaceBetween={0}
        slidesPerView={1}
        direction={"vertical"}
        mousewheel={true}
        effect={"coverflow"}
        navigation={true}
        centeredSlides={true}
        loop={true}
        coverflowEffect={{
          slideShadows: false,
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 1,
        }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {store.list.map((comp: any) => {
          return (
            <SwiperSlide className="swiper-slide">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  className="flex"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <img
                    className="logoImg"
                    style={{
                      display: "block",
                      maxWidth: "120px",
                      maxHeight: "100px",
                      width: "auto",
                      height: "auto",
                    }}
                    src={comp["logo"]}
                  ></img>

                  <div
                    style={{
                      marginLeft: "15px",
                      fontSize: "13px",
                    }}
                  >
                    {comp["location"]}
                  </div>
                </div>

                <img className="carousel-icon" src={comp.avatarSource} />

                <div
                  className="title pointer"
                  onClick={() => redirectToCompanyDetails(comp.id)}
                ></div>
                <div className="revenue">
                  <div className="static">
                    <div className="flex flex-space-between">
                      <div className="">
                        <div className="kpi-title font-regular">Revenue</div>
                        <div className="flex flex-center-x metric">
                          {numberWithCommas(comp.kpis?.REV?.value) || "N/A"}{" "}
                          &euro;
                        </div>
                      </div>
                      <div className="ml5">
                        <div className="kpi-title font-regular">Employees</div>
                        <div className="flex flex-center-x metric">
                          {comp.employee || "N/A"}
                        </div>
                      </div>
                      <div className="ml5">
                        <div className="kpi-title font-regular">Liquidity</div>
                        <div className="flex flex-center-x metric">
                          {numberWithCommas(comp.kpis?.Liquidity?.value) ||
                            "N/A"}{" "}
                          &euro;
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  }

  if (width <= 1024) {
    return (
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, EffectCoverflow]}
        spaceBetween={0}
        slidesPerView={2}
        effect={"coverflow"}
        navigation={true}
        centeredSlides={true}
        loop={true}
        coverflowEffect={{
          slideShadows: false,
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 1,
        }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {store.list.map((comp: any) => {
          return (
            <SwiperSlide className="swiper-slide">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  className="flex"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <img
                    className="logoImg"
                    style={{
                      display: "block",
                      maxWidth: "120px",
                      maxHeight: "100px",
                      width: "auto",
                      height: "auto",
                    }}
                    src={comp["logo"]}
                  ></img>

                  <div
                    style={{
                      marginLeft: "15px",
                      fontSize: "13px",
                    }}
                  >
                    {comp["location"]}
                  </div>
                </div>

                <img className="carousel-icon" src={comp.avatarSource} />

                <div
                  className="title pointer"
                  onClick={() => redirectToCompanyDetails(comp.id)}
                ></div>
                <div className="revenue">
                  <div className="static">
                    <div className="flex flex-space-between">
                      <div className="">
                        <div className="kpi-title font-regular">Revenue</div>
                        <div className="flex flex-center-x metric">
                          {numberWithCommas(comp.kpis?.REV?.value) || "N/A"}{" "}
                          &euro;
                        </div>
                      </div>
                      <div className="ml5">
                        <div className="kpi-title font-regular">Employees</div>
                        <div className="flex flex-center-x metric">
                          {comp.employee || "N/A"}
                        </div>
                      </div>
                      <div className="ml5">
                        <div className="kpi-title font-regular">Liquidity</div>
                        <div className="flex flex-center-x metric">
                          {numberWithCommas(comp.kpis?.Liquidity?.value) ||
                            "N/A"}{" "}
                          &euro;
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  }

  return (
    <div className="company-container wrap" style={{ marginTop: "20px" }}>
      {store.list.map((comp: any) => {
        if (width > 1024) {
          return (
            <Link key={comp.id} href={`${ROUTES.KPI}?companyId=${comp.id}`}>
              <div
                className="flex-item company"
                key={comp["id"]}
                style={{ cursor: "pointer" }}
              >
                <div className="portfolio-image-wrapper">
                  <div className="portfolio-image-uphalfwrapper"></div>

                  <img
                    className={styles.image}
                    src={comp["bgimg"] || comp["img"]}
                  ></img>

                  <div className="portfolio-image-bottomhalfwrapper"></div>
                </div>

                <div
                  className="title pointer"
                  onClick={() => redirectToCompanyDetails(comp.id)}
                >
                  <div
                    className="flex"
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <img
                      className="logoImg"
                      style={{
                        display: "block",
                        maxWidth: "120px",
                        maxHeight: "100px",
                        width: "auto",
                        height: "auto",
                      }}
                      src={comp["logo"]}
                    ></img>

                    <div
                      style={{
                        marginLeft: "15px",
                        fontSize: "13px",
                      }}
                    >
                      {comp["location"]}
                    </div>
                  </div>
                </div>
                <div className="revenue">
                  <div className="static">
                    <div className="flex flex-space-between">
                      <div className="">
                        <div className="kpi-title font-regular">Revenue</div>
                        <div className="flex flex-center-x metric">
                          {numberWithCommas(comp.kpis?.REV?.value) || "N/A"}{" "}
                          &euro;
                        </div>
                      </div>
                      <div className="ml5">
                        <div className="kpi-title font-regular">Employees</div>
                        <div className="flex flex-center-x metric">
                          {comp.employee || "N/A"}
                        </div>
                      </div>
                      <div className="ml5">
                        <div className="kpi-title font-regular">Liquidity</div>
                        <div className="flex flex-center-x metric">
                          {numberWithCommas(comp.kpis?.Liquidity?.value) ||
                            "N/A"}{" "}
                          &euro;
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        }
      })}
    </div>
  );
};

export default CompanyGrid;
