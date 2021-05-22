import './App.css';
import SearchBar from './components/SearchBar.js'
import Player from './components/Player'
import {Card, CardGroup, ListGroup,ListGroupItem, CardDeck, Navbar, Nav,NavDropdown,Form,FormControl,Button, Pagination} from 'react-bootstrap';
import React from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

class App extends React.Component{


	constructor(props){
		super(props);

		this.state = {
  		players: [],
  		pageCount: 0,
  		pageCurrentNumber: 1,
  		per_page: 25,
		isLoading: true,
		search: ''
  		};
  	
		  this.getData = this.getData.bind(this);
		  this.makeSearch = this.makeSearch.bind(this);
		  this.handleChange = this.handleChange.bind(this);
		  this.handleSubmit = this.handleSubmit.bind(this);
		  this.handlePageChange = this.handlePageChange.bind(this);
  	}

	
	  makeSearch(){
		axios.get(`https://www.balldontlie.io/api/v1/players?search=${this.state.search}`)
		.then(res => {
			const players= res.data;
			this.setState({players, isLoading: false}, ()=>{
				console.log('success')
			});
			const pageCount = res.data.meta.total_pages;
			this.setState({pageCount})
			
		})
	  }

  	

  


   displayPlayers = () => {
   		const players = this.state.players;
   		//console.log(players)
   		console.log("test")
   	}

	//Grab data from NBA ball dont lie API
	getData(){
		const URL = `https://www.balldontlie.io/api/v1/players?page=${this.state.pageCurrentNumber}`
		axios.get(URL)
			.then(res => {
				const players= res.data;
				this.setState({players, isLoading: false, pageCount: res.data.meta.total_pages}, ()=>{
					console.log('success')
					console.log(this.state.pageCurrentNumber);
				});
				// const pageCount = res.data.meta.total_pages;
				// this.setState({pageCount})
				
			})
	}

    componentDidUpdate(){

	}

	componentDidMount(_){
	  	this.getData();
	  }

	handleChange(event){
		this.setState({search: event.target.value})
	}

	handleSubmit(event){
	
		console.log(this.state.search);
		this.makeSearch();
		event.preventDefault();
	}

	handlePageChange(obje){
		this.setState({pageCurrentNumber: obje.selected+1}, ()=>{
			this.getData();
		})
		

	}


    render(){
    	const{isLoading} = this.state
    	if(isLoading){
    		return null;
    	}

	  return (
	    <div className="App">
		
		<div>
		<Navbar bg="dark"  variant="dark">
			<Navbar.Brand href="#home">NBA-Ballers</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
				<Nav.Link href="#home">Home</Nav.Link>
				<Nav.Link href="#link">Link</Nav.Link>
				<NavDropdown title="Dropdown" id="basic-nav-dropdown">
					<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
					<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
					<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
				</NavDropdown>
				</Nav>
				<Form inline onSubmit={this.handleSubmit}>
				<FormControl type="text" placeholder="Search" className="mr-sm-2" value={this.state.search} onChange={this.handleChange}/>
				<Button variant="outline-success" type="submit" value="Submit">Search</Button>
				</Form>
			</Navbar.Collapse>
		</Navbar>
	  
		</div>

		<div>
	     <Pagination>
				<ReactPaginate 
					pageCount={this.pageCount}
					pageRange={2}
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
		

		
		<div className="containerTable">
		

	     	{this.state.players.data.map((player)=>(
				<div>
					<Player  
						firstName={player.first_name}
						lastName={player.last_name}
						heightfeet={player.height_feet}
						heightinches={player.height_inches}
						position={player.position}
						team={player.team.full_name}
						teamKey={player.team.abbreviation}
					/>

				</div>
				
			))}
	    </div>


		</div>
	  )
	}
}



export default App;
