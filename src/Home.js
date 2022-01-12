import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import { connect } from "react-redux";
import { Card, Grid, Header, Icon, Image } from "semantic-ui-react";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      dataCarousel: [],
      loading: true,
      dataSchedule: [],
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

          let dataRes = sorted.slice(0, 50);
          this.setState({
            dataCarousel: dataRes,
          });
        });
    } catch (error) {
      alert(JSON.stringify(error.message));
    }
  };

  getDataShedule = async () => {
    try {
      await axios
        .get(`https://api.tvmaze.com/schedule`, { crossDomain: true })
        .then((res) => {
          // console.log(res.data.slice(0, 20));
          let dataRes = res.data.slice(0, 20);
          this.setState({
            dataSchedule: dataRes,
            loading: false,
          });
        });
    } catch (error) {
      alert(JSON.stringify(error.message));
    }
  };

  componentDidMount = async () => {
    await this.getDataCarousel();
    await this.getDataShedule();
  };

  render() {
    return (
      <>
        {this.state.loading ? (
          <h1> Loading .... </h1>
        ) : (
          <div>
            <Header size="large">Top Films</Header>
            <Carousel
              autoPlay
              centerMode
              centerSlidePercentage={40}
              showStatus="false"
            >
              {this.state.dataCarousel.map((data, key) => {
                return (
                  <div key={key}>
                    <Image
                      style={{ height: "auto", width: "50%" }}
                      alt={data.name}
                      src={data.image.medium}
                      as="a"
                      href={data.officialSite}
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
            <Header size="large">Films Schedule</Header>
            <Grid columns={5} divided>
              {this.state.dataSchedule.map((data, key) => {
                var gambar = { ...data.show.image };
                var ratinG = { ...data.show.rating };

                if (gambar === null) {
                  gambar =
                    "https://cdn.pixabay.com/photo/2016/11/15/07/09/photo-manipulation-1825450__480.jpg";
                } else {
                  gambar = gambar.medium;
                }

                if (ratinG.average === null) {
                  ratinG = "0";
                } else {
                  ratinG = ratinG.average;
                }

                return (
                  <Grid.Column key={key}>
                    <Card>
                      <Image
                        src={gambar}
                        as="a"
                        href={data.show.officialSite}
                        wrapped
                        ui={false}
                      />
                      <Card.Content>
                        <Card.Header>{data.show.name}</Card.Header>
                        <Card.Meta>
                          Episode : {data.name} <br />
                          Status : {data.show.status}
                        </Card.Meta>
                        <Card.Description>
                          Schedule Airtime : {data.show.schedule.time}
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <h3 style={{ color: "gold" }}>
                          <Icon name="star outline" />
                          {ratinG}
                        </h3>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                );
              })}
            </Grid>
          </div>
        )}
      </>
    );
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    type: "ACTIVE_ITEM",
    ActiveItem: "home",
  };
};

export default connect(null, mapDispatchtoProps)(Home);
