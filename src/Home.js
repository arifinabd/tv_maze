import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      dataCarousel: [],
      loading: true,
    };
  }

  getDataCarousel = async () => {
    try {
      await axios
        .get(`https://api.tvmaze.com/shows`, { crossDomain: true })
        .then((res) => {
          let sorted = res.data.sort(function (a, b) {
            return a.rating.average < b.rating.average
              ? 1
              : b.rating.average < a.rating.average
              ? -1
              : 0;
          });

          let dataRes = sorted.slice(0, 10);
          this.setState({
            dataCarousel: dataRes,
            loading: false,
          });
        });
    } catch (error) {
      alert(JSON.stringify(error.message));
    }
  };

  componentDidMount = async () => {
    await this.getDataCarousel();
  };

  render() {
    return (
      <>
        {this.state.loading ? (
          <h1> Loading .... </h1>
        ) : (
          <Carousel
            autoPlay
            centerMode
            centerSlidePercentage={40}
            showStatus="false"
          >
            {this.state.dataCarousel.map((data, key) => {
              return (
                <div>
                  <img
                    style={{ height: "auto", width: "60%" }}
                    alt={data.name}
                    src={data.image.medium}
                  />
                  <p className="legend">
                    {data.name}
                    <br />
                    {data.rating.average}
                  </p>
                </div>
              );
            })}
          </Carousel>
        )}
      </>
    );
  }
}

export default Home;
