import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "us",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  articles = [];

  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: true,
      page: 1,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=06558b23e9c64b9696afccab8107663b&page=1&pageSize=${this.props.pageSize}`;
    this.state.loading
      ? this.setState({ loading: true })
      : this.setState({ loading: false });
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.setState({ page: 1 });
  }

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=${
      this.props.category
    }&apiKey=06558b23e9c64b9696afccab8107663b&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.state.loading
      ? this.setState({ loading: true })
      : this.setState({ loading: false });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ page: this.state.page - 1 });
    this.setState({ articles: parsedData.articles });
    this.setState({ loading: false });
  };

  handleNextClick = async () => {
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / 10)) {
    } else {
      let url = `https://newsapi.org/v2/top-headlines?country=us&category=${
        this.props.category
      }&apiKey=06558b23e9c64b9696afccab8107663b&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;
      this.state.loading
        ? this.setState({ loading: true })
        : this.setState({ loading: false });
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({ page: this.state.page + 1 });
      this.setState({ articles: parsedData.articles });
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <>
        <div className="header text-center">
          <h1>News</h1>
        </div>

        {this.state.loading && <Spinner />}

        <div className="container my-3">
          <div className="row">
            {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://mamatafertility.com/wp-content/themes/consultix/images/no-image-found-360x250.png"
                    }
                    newsUrl={element.url}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="container d-flex justify-content-between my-5">
          <button
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous{" "}
          </button>
          <button
            disabled={
              this.state.page + 1 > Math.ceil(this.state.totalResults / 20)
            }
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;{" "}
          </button>
        </div>
      </>
    );
  }
}

export default News;
