import React from 'react'
import {Card,ListGroupItem,ListGroup} from 'react-bootstrap';
import '../App.js'




//Component for Player Card.
class Player extends React.Component {

  
    componentDidMount(){
       
    }

    render(){
        return(
        <div className="playerClass">
            <Card >
                <div className="card">
                <div className="cardImage">
                    <Card.Img  variant="top"  src={`${this.props.teamKey}.png`} />
                </div>
                <Card.Body>
                    <Card.Title>{this.props.firstName} {this.props.lastName}</Card.Title>
                </Card.Body>
                <ListGroup>

                    <ListGroupItem>Height: {this.props.heightinches && this.props.heightfeet ? this.props.heightfeet+"' "+this.props.heightinches : 'Unknown'}</ListGroupItem>
                    <ListGroupItem>Position: {this.props.position ? this.props.position: 'Unknown'}</ListGroupItem>
                    <ListGroupItem>Team: {this.props.team}</ListGroupItem>
                </ListGroup>
                </div>
            </Card>
        </div>
        );
    }
}


export default Player;