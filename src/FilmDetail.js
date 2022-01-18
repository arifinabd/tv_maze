import axios from "axios";
import React, { Component } from "react";
import { Card, Grid, Header, Icon, Image } from "semantic-ui-react";

class FilmDetail extends Component {
  constructor() {
    super();
    this.state = {
      dataDetail: [],
      loading: true,
    };
  }

  getDataDetail = async () => {
    try {
      let id = this.props.location.pathname.split("/")[2];
      // console.log(id);
      await axios
        .get(`https://api.tvmaze.com/shows/${id}?embed=cast`, {
          crossDomain: true,
        })
        .then((res) => {
          // console.log(res.data);
          this.setState({
            dataDetail: res.data,
            loading: false,
          });
        });
    } catch (error) {
      alert(JSON.stringify(error.message));
    }
  };

  componentDidMount = async () => {
    await this.getDataDetail();
    // await this.getDataSearch();
  };

  render() {
    // console.log(this.state.dataDetail);
    return (
      <>
        {this.state.loading ? (
          <h1>Loading ...</h1>
        ) : (
          <div style={{ padding: "20px" }}>
            <Header as={"h1"}>{this.state.dataDetail.name}</Header>
            <Grid>
              <Grid.Row>
                <Grid.Column width={4}>
                  <Image
                    src={
                      this.state.dataDetail.image
                        ? this.state.dataDetail.image.original
                        : "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png"
                    }
                    alt={this.state.dataDetail.name}
                  />
                </Grid.Column>
                <Grid.Column width={9}>
                  <Header as={"h3"}>Description</Header>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: this.state.dataDetail.summary,
                    }}
                  />
                </Grid.Column>
                <Grid.Column width={3}>
                  <Header as={"h4"} disabled>
                    Rating
                  </Header>
                  <div>
                    <Icon name="star" size="large" color="yellow" />{" "}
                    {this.state.dataDetail.rating.average
                      ? this.state.dataDetail.rating.average
                      : 0}
                  </div>
                  <Header as={"h4"} disabled>
                    Genres
                  </Header>
                  <div>
                    {this.state.dataDetail.genres.map((genre, id) => {
                      return <span key={id}>{genre} </span>;
                    })}
                  </div>
                  <Header as={"h4"} disabled>
                    Language
                  </Header>
                  <div>
                    {this.state.dataDetail.language
                      ? this.state.dataDetail.language
                      : "No data"}
                  </div>
                  <Header as={"h4"} disabled>
                    Status
                  </Header>
                  <div>
                    {this.state.dataDetail.status
                      ? this.state.dataDetail.status
                      : "No data"}
                  </div>
                </Grid.Column>
              </Grid.Row>
              <Header as={"h2"}>Cast</Header>
              <Grid.Row columns={5}>
                {this.state.dataDetail._embedded.cast.map((cast, id) => {
                  return (
                    <Grid.Column key={id}>
                      <Card style={{ margin: "5px" }}>
                        <Image
                          src={
                            cast.person.image
                              ? cast.person.image.medium
                              : "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png"
                          }
                          wrapped
                          ui={false}
                        />
                        <Card.Content>
                          <Card.Header>{cast.person.name}</Card.Header>
                          <Card.Meta>
                            <span className="date">{cast.person.gender}</span>
                          </Card.Meta>
                          <Card.Description>
                            as{" "}
                            <span style={{ fontWeight: "bold" }}>
                              {cast.character.name}
                            </span>
                          </Card.Description>
                        </Card.Content>
                      </Card>
                    </Grid.Column>
                  );
                })}
              </Grid.Row>
            </Grid>
          </div>
        )}
      </>
    );
  }
}

export default FilmDetail;
