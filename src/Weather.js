import React, { useEffect, useState } from 'react';
import { AiOutlineSearch } from "react-icons/ai";

const api = {
  key: "f1a7d0d7e1ac3b6d3c6937c59a07ece4",
  base: "https://api.openweathermap.org/data/2.5/"
}

const iconUrl = "http://openweathermap.org/img/wn/";

const Weather = () => {

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState({});
  const [value, setValue] = useState("");


  const getWeather = (value) => {
    fetch(`${api.base}weather?q=${value}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          setValue("");
          let url = iconUrl + result.weather[0].icon + "@2x.png";

          let val = Math.round(result.main.temp);

          changeBackground(val);

        }
      )
  }

  const changeBackground = (bg) => {

    if (bg < 6) {
      document.body.classList.remove("background-warm");
      document.body.classList.remove("background-hot");
      document.body.classList.add("background-cold");
    }
    if (bg >= 6 && bg < 25) {
      document.body.classList.remove("background-cold");
      document.body.classList.remove("background-hot");
      document.body.classList.add("background-warm");
    }
    if (bg >= 25) {
      document.body.classList.remove("background-warm");
      document.body.classList.remove("background-cold");
      document.body.classList.add("background-hot");
    }


  }

  useEffect(() => {
    getWeather("Turkey");
  }, []);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      getWeather(e.target.value);
    }
  }

  const handleSubmit = () => {
    let place = document.getElementById("place").value;
    getWeather(place);
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let hour = d.getHours();
    let minute = d.getMinutes();

    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minute < 10) {
      minute = "0" + minute;
    }

    return `${hour}:${minute} - ${day}, ${date} ${month} ${year}`
  }


  return (
    <>

      <div className="container-fluid">
        <div className="row height">

          <div className="col-6 col-lg-8">

            <div className="mt-3 ">
              <h4 className='px-4 font-header'>G`Weather</h4>
            </div>


            <div className="container-fluid mb-5 text-capitalize fixed-bottom">
              {(typeof items.main != "undefined" && typeof items.weather != "undefined") ?
                <>
                  <div className="row align-items-center d-flex flex-row">
                    <div className="col-6 col-lg-8">
                      <div className="row mx-0">
                        <div className="col-lg-6 col-12 d-flex align-items-center justify-content-center">
                          <div className='fontSize text-center'>
                            {Math.round(items.main.temp)}°
                          </div>
                        </div>
                        <div className="col-lg-4 col-12 display justify-content-center align-content-center">
                          <div className='fontSize2 text-center text-lg-start'>{items.name}, {items.sys.country}</div>
                          <div className='fontSize3 text-center text-lg-start'>{dateBuilder(new Date())}</div>
                        </div>
                        <div className="col-lg-2 col-12 display align-content-center justify-content-center">
                          <div>
                            <img src={`${iconUrl}${items.weather[0].icon}@2x.png`} alt="icon" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
                : ""}
            </div>


          </div>




          <div className="col-6 col-lg-4 search-bg">

            <div className="container-fluid p-0">
              <div className="row align-items-end d-flex flex-row mb-5">

                <div className="col-9">
                  <input id='place' className="form-control search-box px-0 font-header" type="search" placeholder="Search" aria-label="Search" value={value} onChange={(e) => setValue(e.target.value)} onKeyPress={handleSearch}
                  />

                </div>
                <div className="col-3 p-0 d-flex justify-content-end">

                  <button className="btn" type="submit" onClick={handleSubmit}>
                    <AiOutlineSearch />
                  </button>
                </div>

              </div>

            </div>

            <div className="container-fluid p-0">
              <div className="row d-flex flex-row mb-3">
                <div className='font'>Birmingham</div>
              </div>
              <div className="row d-flex flex-row mb-3">
                <div className='font'>Manchester</div>
              </div>
              <div className="row d-flex flex-row mb-3">
                <div className='font'>New York</div>
              </div>
              <div className="row d-flex flex-row mb-3">
                <div className='font'>California</div>
              </div>
            </div>

            <div className="line mt-5 mb-5"></div>

            <div className="container-fluid p-0">
              <div className="row d-flex flex-row mb-3">
                <div className='text-light font-header mb-5'>Weather Details</div>
              </div>
              {(typeof items.main != "undefined" && typeof items.weather != "undefined") ?
                <>

                  <div className="row d-flex flex-row mb-3">
                    <div className="col-8 font">
                      Clouds
                    </div>
                    <div className="col-4 font px-2 d-flex justify-content-end text-light">
                      {items.clouds.all}%
                    </div>
                  </div>

                  <div className="row d-flex flex-row mb-3">
                    <div className="col-8 font">
                      Humidity
                    </div>
                    <div className="col-4 font px-2 d-flex justify-content-end text-light">
                      {items.main.humidity}%
                    </div>
                  </div>

                  <div className="row d-flex flex-row mb-3">
                    <div className="col-8 font">
                      Wind
                    </div>
                    <div className="col-4 font px-2 d-flex justify-content-end text-light">
                      {Math.round(items.wind.speed)}km/h
                    </div>
                  </div>

                  <div className="row d-flex flex-row mb-3">
                    <div className="col-8 font">
                      Feels Like
                    </div>
                    <div className="col-4 font px-2 d-flex justify-content-end text-light">
                      {Math.round(items.main.feels_like)}°C
                    </div>
                  </div>

                  <div className="row d-flex flex-row">
                    <div className="col-8 font">
                      Pressure
                    </div>
                    <div className="col-4 font px-2 d-flex justify-content-end text-light">
                      {items.main.pressure}hPa
                    </div>
                  </div>

                </>
                : ""}


            </div>

          </div>

          <div className='d-flex align-items-end justify-content-center fixed-bottom'>
            <footer>
              <div className='container-fluid font text-light text-center '>
                NO &copy; 2022 GÖKSU YAZILIM
              </div>
            </footer>
          </div>

        </div>
      </div>


    </>

  );
};

export default Weather;
