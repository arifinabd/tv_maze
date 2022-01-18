import axios from "axios";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Header, Image, Card, Icon, Input } from "semantic-ui-react";

class Film extends Component {
  constructor() {
    super();
    this.state = {
      dataFilm: [],
      loading: true,
      dataSeacrh: [],
    };
  }

  getDataFilms = async () => {
    try {
      await axios
        .get("https://api.tvmaze.com/search/shows?q=marvel", {
          crossDomain: true,
        })
        .then((res) => {
          // console.log(res.data);
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

  getDataSearch = async (e) => {
    if (e.target.value === "") {
      this.getDataFilms();
    } else {
      try {
        await axios
          .get(`https://api.tvmaze.com/search/shows?q=${e.target.value}`, {
            crossDomain: true,
          })
          .then((res) => {
            // console.log(res.data);
            let dataRes = res.data;
            this.setState({
              dataFilm: dataRes,
            });
          });
      } catch (error) {
        alert(JSON.stringify(error.message));
      }
    }
  };

  componentDidMount = async () => {
    await this.getDataFilms();
    // await this.getDataSearch();
  };

  render() {
    return (
      <>
        {this.state.loading ? (
          <h1>Loding ...</h1>
        ) : (
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
                  <div style={{ marginBottom: "20px" }}>
                    <Input
                      icon="search"
                      placeholder="Search..."
                      onChange={(e) => {
                        this.getDataSearch(e);
                      }}
                    />
                  </div>
                  <Grid columns={3} divided>
                    {this.state.dataFilm.map((data, key) => {
                      var gambar = { ...data.show.image };
                      var ratinG = { ...data.show.rating };

                      if (data.show.image === null) {
                        gambar =
                          "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
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
                          <Link to={`/detail/${data.show.id}`}>
                            <Card>
                              <Image src={gambar} wrapped ui={false} />
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
                          </Link>
                        </Grid.Column>
                      );
                    })}
                  </Grid>
                </Grid.Column>
                <Grid.Column width={3}>
                  <Image src="https://rsiarafah.id/assets_web/img/images_pp/A4.jpg" />
                </Grid.Column>
              </Grid.Row>
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
    ActiveItem: "film",
  };
};

export default connect(null, mapDispatchtoProps)(Film);
