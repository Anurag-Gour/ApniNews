import React, { Component } from "react";
import Loader from "./Loader";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";
export default class News extends Component {
  
  static defaultProps = {
    category : PropTypes.string,
  }
  
  static propTypes = {
    category : PropTypes.string,
  }
  
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=14639ef7db8e42d4a9e1928f3c81e021&pagesize=15&page=${this.state.page}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading:false
    });
  }

  handlePrevClick = async () => {
    await this.setState({
      loading:true,
      page: this.state.page - 1,
    });
    this.componentDidMount();
  };
  handleNextClick = async () => {
    await this.setState({
      loading:true,
      page: this.state.page + 1,
    });
    this.componentDidMount();
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">ApniNews</h1>
        {this.state.loading && <Loader />}
        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                {(!this.state.loading) && <NewsItem
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />}
              </div>
            );
          })}
          <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              type="button"
              onClick={this.handlePrevClick}
              className="btn btn-dark"
            >
              &larr; Previous
            </button>
            <button
              disabled={
                this.state.page + 1 > Math.ceil(this.state.totalResults / 15)
              }
              type="button"
              onClick={this.handleNextClick}
              className="btn btn-dark"
            >
              &rarr; Next
            </button>
          </div>
        </div>
      </div>
    );
  }
}
