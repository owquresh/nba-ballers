import './App.css';
import Player from './components/Player'
import {Table, Navbar, Nav,Form,FormControl,Button, Pagination} from 'react-bootstrap';
import React from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

class App extends React.Component{


	constructor(props){
		super(props);

		//initial state of our APP Component
		this.state = {
	  		players: [],
	  		pageCount: 0,
	  		pageCurrentNumber: 1,
	  		per_page: 25,
			isLoading: true,
			showCards: true,
			search: '',

  		};
  	
		  //binding functions for our class to bind to THIS react context.
		  this.getData = this.getData.bind(this);
		  this.handleChange = this.handleChange.bind(this);
		  this.handleSubmit = this.handleSubmit.bind(this);
		  this.handlePageChange = this.handlePageChange.bind(this);
  	}


 

	//Grab data from NBA ball dont lie API
	getData(){
		const URL = `https://www.balldontlie.io/api/v1/players?search=${this.state.search}&&page=${this.state.pageCurrentNumber}`
		axios.get(URL)
			.then(res => {
				const players= res.data;
				console.log(res.data)
				this.setState({players, isLoading: false, pageCount: res.data.meta.total_pages}, ()=>{
					console.log(this.state.pageCount)
				});
			
				
			})
	}

    

	//grab data on component mounting  and setup default title
	componentDidMount(){
		document.title ="NBA-Ballers";
	  	this.getData();
	}



	//these two methods handle the search bar and updating the state 
	//when a search is made and changing their respectives list
	handleChange(event){
		this.setState({search: event.target.value})
	}
	handleSubmit(event){

		this.getData();
		event.preventDefault();
	}

	//handles pagination using pageCurrentNumber index
	handlePageChange(obje){
		this.setState({pageCurrentNumber: obje.selected+1}, ()=>{
			this.getData(); 
		})

	}
		

	


    render(){

		//only render the elements if data 
		//has been called and loaded into state
    	const{isLoading} = this.state
    	if(isLoading){
    		return null;
    	}

	  return (
	    <div className="App">

	
		
		{/* Nav Bar and Search bar using Form/Formcontrol.  */}
		<Navbar bg="dark"  variant="dark">
			<Navbar.Brand >NBA-Ballers</Navbar.Brand>
			<div className="navTabs">
				<Button variant="primary" onClick={() => this.setState({showCards:true})}>Card</Button>{' '}
				<Button variant="light" onClick={() => this.setState({showCards: false})}>List</Button>
			</div>
			<Form inline onSubmit={this.handleSubmit}>
				<FormControl type="text" placeholder="Search for a player" className="mr-sm-2" value={this.state.search} onChange={this.handleChange}/>
				<Button variant="info" type="submit" value="Submit">Search</Button>
			</Form>
		
		</Navbar>
	  
		


		{/* Pagination tool imported from react paginate
			uses static page count as pages are given from 
			api call to balldontlie.api
		
		*/}
		<div className="paginator">
	     <Pagination>
				<ReactPaginate 
					pageCount={139}
					pageRange={5}
					marginPagesDisplayed={2}
					onPageChange={this.handlePageChange}
					containerClassName={'container'}
					previousLinkClassName={'page'}
					breakClassName={'page'}
					nextLinkClassName={'page'}
					pageClassName={'page'}
					disabledClassNae={'disabled'}
					activeClassName={'active'}
				/>
			</Pagination>
		</div>	
		

		
		{/* Table/Card list viewer for 
			NBA player elements. works by mapping through state
			and displaying Cards or Table list based on user input.
		
		*/}
		<div className="containerTable">
		

	     	{this.state.showCards ? this.state.players.data.map((player)=>(
				<div>
					<Player  
						key={player.id}
						firstName={player.first_name}
						lastName={player.last_name}
						heightfeet={player.height_feet}
						heightinches={player.height_inches}
						position={player.position}
						team={player.team.full_name}
						teamKey={player.team.abbreviation}
					/>

				</div>
				
			)) :
	     	<Table>
	     		
	     		<thead>
	     			<tr>	
		     			<th>Player ID</th>
		     			<th>First Name</th>
		     			<th>Last Name</th>
		     			<th>Height</th>
						<th>Weight</th>
		     			<th>Position</th>
		     			<th>Team</th>
		     		</tr>
	     		</thead>
	     		

	     		<tbody>
	     			
	     			{this.state.players.data.map((player) =>(
	     				<tr key={player.id}>
	     					<td >{player.id}</td>
	     					<td>{player.first_name}</td>
	     					<td>{player.last_name}</td>
	     					<td>{(player.height_feet && player.height_inches) ? (player.height_feet + "'" + player.height_inches) : "Unknown"}</td>
	     					<td>{player.weight_pounds ? player.weight_pounds + ' lbs' : "Unknown"}</td>
							<td>{player.position ? player.position : "Unknown"}</td>
	     					<td>{player.team.full_name}</td>
	     				</tr>
	     			))}
	     			
	     		</tbody>

	     	</Table>
	     }

	    </div>

	    


		</div>
	  )
	}
}



export default App;
