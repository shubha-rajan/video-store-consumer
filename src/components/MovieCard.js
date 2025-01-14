import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Card, Button} from 'react-bootstrap'
import moment from 'moment';

import './MovieCard.css';



class MovieCard extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      numCopies: 0
    };
  }
  

  onSelectButtonClick = () => {
    this.props.selectMovieCallback(this.props);
  }

  onAddButtonClick = () => {
    this.props.selectMovieCallback(this.props, this.state.numCopies);
  }

  onInputChange = (event) => {
    const updatedState = {};

    const field = event.target.name;
    const value = event.target.value;

    updatedState[field] = value;
    this.setState(updatedState);
  }

  render () { 
    const { title, overview, release_date, inventory, image_url, buttonDisplay, parentComponent } = this.props;

    const inventoryDisplay = {
      'movieLibrary': (
        <div><Card.Text>Inventory: {inventory}</Card.Text>
         <Button onClick={ this.onSelectButtonClick } className="select-movie-btn" variant='primary'>{buttonDisplay}</Button><br/>
        </div>),

      'search': (
        <Card.Text>
          <form 
            className="inventoryNum"
            onSubmit={this.onSearchSubmit}>
            <label>
              Copies to Add: 
              <input
                name="numCopies"
                value={this.state.numCopies}
                onChange={this.onInputChange}
                type="number" min="1" max="10"/>
            </label>
          </form>
          <Button onClick={ this.onAddButtonClick }
            className="select-movie-btn"
            variant='primary'
            >{buttonDisplay}
          </Button>
          </Card.Text>
      )
    } 
    
    return (
      <Card className='movie-card'>
        <Card.Img variant="top" src={image_url} alt={`cover for ${title}`}/>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text className='overview'>{overview}</Card.Text>
          <Card.Text>Release date: {moment(release_date).format("MMM Do, YYYY")}</Card.Text>
          {inventoryDisplay[parentComponent]}
        </Card.Body>
      </Card>
    );
  }
};

MovieCard.propTypes = {
  title: PropTypes.string, 
  overview: PropTypes.string, 
  release_date: PropTypes.string, 
  inventory: PropTypes.number, 
  image_url: PropTypes.string, 
  buttonDisplay:PropTypes.string, 
  parentComponent: PropTypes.string, 
  selectMovieCallback: PropTypes.func
}

export default MovieCard;
