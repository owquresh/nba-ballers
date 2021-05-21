import './App.css';
import SearchBar from './components/SearchBar.js'
import {ListGroup} from 'react-bootstrap';
import React from 'react';
import axios from 'axios';

class App extends React.Component{

	constructor(props){
		super(props);

		this.state = {
  		players: [],
  		pageCount: 0,
  		pageCurrentNumber: 1,
  		per_page: 25,
  		isLoading: true,
  		};
  	
  		this.getData = this.getData.bind(this);
  	}

	

  	

  


   displayPlayers = () => {
   		const players = this.state.players;
   		console.log(players)
   		console.log("test")
   	}

	//Grab data from NBA ball dont lie API
	getData(){
		axios.get('https://www.balldontlie.io/api/v1/players')
			.then(res => {
				const players= res.data;
				this.setState({players, isLoading: false}, ()=>{
					console.log(this.state.players.data)
				});
				const pageCount = res.data.meta.total_pages;
				this.setState({pageCount})
				
			})
	}

    componentDidUpdate(){

	}

	componentDidMount(_){
	  	this.getData();
	  }

    render(){
    	const{isLoading} = this.state
    	if(isLoading){
    		return null;
    	}

	  return (
	    <div className="App">

	     <SearchBar />
	     <ListGroup horizontal>
	     	{this.state.players.data.map((player)=>(
				<Player  
					firstName={player.first_name}
					lastName={player.last_name}
					height={player.height_feet}
					position={player.position}
					team={player.team}
				/>
			))}
	     </ListGroup>
	    </div>

	 
	  )
	}
}

const Player = ({firstName, lastName, height, position, team}) => (
		<ListGroup.item>
			<p>Name:{firstName} {lastName}</p>
			<p>{height}</p>
			<p>{position}</p>
			<p>{team}</p>
		</ListGroup.item>
);


export default App;
