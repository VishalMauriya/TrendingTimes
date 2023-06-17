import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
   
      static defaultProps = {
        country : 'in',
        pageSize : 6,
        category : 'general'
      }

      static propTypes = {
        country : PropTypes.string,
        pageSize : PropTypes.number,
        category : PropTypes.string
      }

      capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

      constructor(props){
        super(props);
        this.state = {
            articles : [],
            loading : false,
            page : 1,
            totalResults : 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - TrendingTimes`;
      }

      async updateNews(){
        this.props.setProgress(10);
        let api = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        console.log(api)
        this.setState({loading : true});
        let data = await fetch(api);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);

        this.setState({
          articles : parsedData.articles,
          totalResults : parsedData.totalResults,
          loading : false
        })
        this.props.setProgress(100);
      }

      async componentDidMount(){
        this.updateNews();
      }

      handleNextClick = async () => {
        this.setState({page : this.state.page + 1});
        this.updateNews();
      }

      handlePrevClick = async () => {
        this.setState({page : this.state.page - 1});
        this.updateNews();
      }

      fetchMoreData = async () => {
        this.setState({page : this.state.page + 1});
        let api = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(api);
        let parsedData = await data.json();

        this.setState({
          articles : this.state.articles.concat(parsedData.articles),
          totalResults : parsedData.totalResults,
        })
      };

  render() {
    return (
      <>
        <h2 className="text-center" style={{margin : '35px 0px'}}>TrendingTimes - Top Headlines from {this.capitalizeFirstLetter(this.props.category)}</h2>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this  .fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
      <div className='container my-3'>
        <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>{
                return <div className="col-md-4" key={element.url}>
                <NewsItem title={element.title ? element.title.slice(0,45) : ""} description={element.description ? element.description.slice(0,88) : ""} 
                        imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>
            })}
        </div>
      </div>
        </InfiniteScroll>

      </>
    )
  }
}

export default News
