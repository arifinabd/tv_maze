import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Header, Image, Card, Icon } from "semantic-ui-react";

class Film extends Component {
  constructor() {
    super();
    this.state = {
      dataFilm: [],
      loading: true,
    };
  }

  getDataFilms = async () => {
    try {
      await axios
        .get("https://api.tvmaze.com/search/shows?q=marvel", {
          crossDomain: true,
        })
        .then((res) => {
          console.log(res.data);
          let dataRes = res.data;
          this.setState({
            dataFilm: dataRes,
            loading: false,
          });
        });
    } catch (error) {
      alert(JSON.stringify(error.message));
    }
  };

  componentDidMount = async () => {
    await this.getDataFilms();
  };

  render() {
    return (
      <>
        <div>
          <Header size="large">Data Films</Header>
          <Grid celled="internally">
            <Grid.Row>
              <Grid.Column width={2}>
                <Image src="https://cdn.pixabay.com/photo/2016/11/15/07/09/photo-manipulation-1825450__480.jpg" />
                <Image
                  style={{ marginTop: 20 }}
                  src="https://cdn.pixabay.com/photo/2016/11/15/07/09/photo-manipulation-1825450__480.jpg"
                />
                <Image
                  style={{ marginTop: 20 }}
                  src="https://cdn.pixabay.com/photo/2016/11/15/07/09/photo-manipulation-1825450__480.jpg"
                />
              </Grid.Column>
              <Grid.Column width={10}>
                <Grid columns={3} divided>
                  {this.state.dataFilm.map((data, key) => {
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
                              language : {data.show.language}
                            </Card.Meta>
                            <Card.Meta>
                              Episode : {data.show.name} <br />
                              Status : {data.show.status}
                            </Card.Meta>
                            <Card.Description>
                              Description :{" "}
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: data.show.summary,
                                }}
                              />
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
              </Grid.Column>
              <Grid.Column width={3}>
                <Image src="https://cdn.pixabay.com/photo/2016/11/15/07/09/photo-manipulation-1825450__480.jpg" />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </>
    );
  }
}

const mapDispatchtoProps = (dispatch) => {
  return {
    type: "ACTIVE_ITEM",
    ActiveItem: "film",
  };
};

export default connect(null, mapDispatchtoProps)(Film);
