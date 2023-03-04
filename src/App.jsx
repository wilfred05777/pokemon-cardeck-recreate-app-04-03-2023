// @ts-nocheck
import React, { Component } from 'react'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pokemon: [],
      searchTerm: ''
    }
  }

  componentDidMount() {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=10`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          pokemon: data.results
        })
      })
      .catch((error) => console.error(error))
  }

  handleSearchTermChange = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }
  handleSubmit = (event) => {
    event.preventDefault()
    console.log('handleSubmit called')
  }

  render() {
    // const { name, imageURL, types } = this.state
    const { pokemon, searchTerm } = this.state

    const filteredPokemon = pokemon.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
      <div className='App'>
        <form onSubmit={this.handleSubmit}>
          <input
            type='text'
            placeholder='Search for Pokemon...'
            value={searchTerm}
            onChange={this.handleSearchTermChange}
          />
          <button type='submit'>Search</button>
        </form>
        <div className='card-listing'>
          {pokemon.map((item, index) => (
            <div className='card' key={index}>
              <h2>{item.name}</h2>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  index + 1
                }.png`}
                alt={item.name}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default App
