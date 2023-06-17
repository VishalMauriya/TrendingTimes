import React, { Component } from 'react'

export class NewsItem extends Component {
    defaultUrl = "https://e7.pngegg.com/pngimages/831/199/png-clipart-newspaper-headline-design-de-jornal-text-logo.png";
  render() {
    let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
    return (
      <div className='my-3'>
        <div className="card">
          <div style={{display : 'flex', justifyContent : 'center', position : 'absolute', right : '0'}}>
            <span className="badge rounded-pill bg-danger" style={{left : '90%', zIndex : 1}}>{source}</span>
          </div>
        <img src={imageUrl ? imageUrl : this.defaultUrl} className="card-img-top" alt="news" />
        <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {author ? author : 'Unknown'} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target='blank' className="btn btn-sm btn-primary">Read More</a>
        </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
