import React, { Component } from "react";
import { connect } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import { Card, Grid, Image } from "semantic-ui-react";
import axios from "axios";

class Actor extends Component {
  constructor() {
    super();
    this.state = {
      dataActor: [],
      loading: true,
    };
  }

  getDataActor = async () => {
    try {
      await axios
        .get(`https://api.tvmaze.com/search/people?q=lauren`, {
          crossDomain: true,
        })
        .then((res) => {
          let dataRes = res.data;
          this.setState({
            dataActor: dataRes,
            loading: false,
          });
        });
    } catch (error) {
      alert(JSON.stringify(error.message));
    }
  };

  componentDidMount = async () => {
    await this.getDataActor();
  };

  render() {
    console.log(this.state.dataActor);
    return (
      <>
        <div>
          <Carousel
            autoPlay
            centerMode
            centerSlidePercentage={40}
            showStatus={false}
          >
            {this.state.dataActor.map((data, key) => {
              var gambar = { ...data.person.image };

              if (data.person.image === null) {
                gambar =
                  "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
              } else {
                gambar = gambar.original;
              }

              return (
                <div key={key}>
                  <img
                    style={{ height: "auto", width: "50%" }}
                    src={gambar}
                    alt={data.person.name}
                  />
                  <p className="legend">{data.person.name}</p>
                </div>
              );
            })}
          </Carousel>
        </div>

        <div>
          <Grid celled>
            <Grid.Column width={4}>
              <Image src="https://static.tvmaze.com/images/no-img/no-img-portrait-text.png" />
            </Grid.Column>
            <Grid.Column width={12}>
              <Card.Group>
                {this.state.dataActor.map((data, key) => {
                  let gambar = { ...data.person.image };
                  let country = { ...data.person.country };

                  if (data.person.image === null) {
                    gambar =
                      "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
                  } else {
                    gambar = gambar.original;
                  }
                  return (
                    <Card key={key}>
                      <Card.Content>
                        <Image floated="left" size="mini" src={gambar} />
                        <Card.Header>{data.person.name}</Card.Header>
                        <Card.Meta>
                          Gender :{" "}
                          {data.person.gender ? data.person.gender : "No data"}
                        </Card.Meta>
                        <Card.Meta>
                          Country : {country.name ? country.name : "No data"}
                        </Card.Meta>
                        <Card.Description>
                          <a href={data.person.url}>Link bio</a>
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  );
                })}
              </Card.Group>
            </Grid.Column>
          </Grid>
        </div>
      </>
    );
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    type: "ACTIVE_ITEM",
    ActiveItem: "actor",
  };
};

export default connect(null, mapDispatchtoProps)(Actor);
