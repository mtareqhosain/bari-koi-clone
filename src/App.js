import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import './Style/style.css';
import Switch from '@material-ui/core/Switch';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import ListPanel from './components/ListPanel';
import FinalPlace from './components/FinalPlace';

export default class SimpleExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 23.8222241417755,
            lng: 90.37166330963373,
            zoom: 20,
            search: '',
            places: [],
            toggle: false,
            colorToggle: false,
            selectedPlace: null,
            inputValue: '',
        };
    }

    autoComplete = async (query) => {
        this.setState({ inputValue: query });
        try {
            let response = await fetch(`https://barikoi.xyz/v1/api/search/autocomplete/MTg4Mzo5V0tENzgyVVBW/place?q=${query}`);
            let results = await response.json();
            //console.log('results', results);
            this.setState({ places: results.message ? [] : results.places });
        } catch (error) {
            console.log('fetch error', error);
        }
    };
    navigate = (item) => {
        this.setState({
            inputValue: item.address,
            selectedPlace: item,
            places: [],
            lat: item.latitude,
            lng: item.longitude,
        });
    };
    render() {
        const position = [this.state.lat, this.state.lng];
        return (
            <div className='container'>
                <div className='search_container' style={{ backgroundColor: this.state.colorToggle ? '#867f80' : 'white', width: this.state.toggle ? '0px' : '40%' }}>
                    {this.state.toggle === true && (
                        <button className='rightButton' onClick={() => this.setState({ toggle: false })}>
                            <KeyboardArrowRightIcon />
                        </button>
                    )}
                    <div className='input_container'>
                        <div className='input'>
                            <input
                                className={this.state.colorToggle ? 'text_input-light' : 'text_input-dark'}
                                variant='outlined'
                                placeholder='Search Location.'
                                autoComplete='off'
                                value={this.state.inputValue}
                                onChange={(e) => {
                                    this.autoComplete(e.target.value);
                                }}
                                type='text'
                                name='name'
                            />

                            <Switch color='primary' size='medium' onChange={() => this.setState({ colorToggle: !this.state.colorToggle })} />
                        </div>

                        {this.state.toggle !== true && (
                            <ul
                                className='list_container'
                                style={{
                                    visibility: this.state.inputValue === '' ? 'hidden' : 'visible',
                                }}
                            >
                                {this.state.places.map((item) => {
                                    return <ListPanel color={this.state.colorToggle ? 'yellow' : '#f6f6f6'} onSelect={() => this.navigate(item)} item={item} />;
                                })}
                            </ul>
                        )}

                        {this.state.selectedPlace && <FinalPlace clrToggle={this.state.colorToggle ? 'white' : 'black'} selectedPlaceInfo={this.state.selectedPlace} />}
                    </div>
                </div>

                <div className='map_container' style={{ width: this.state.toggle ? '100%' : '50%' }}>
                    {this.state.toggle === false && (
                        <button
                            className='leftButton'
                            onClick={() => {
                                this.setState({ toggle: true });
                            }}
                        >
                            <KeyboardArrowLeftIcon />
                        </button>
                    )}

                    <Map style={{ width: '100%', height: '100vh', zIndex: 0 }} center={position} zoom={this.state.zoom}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        />
                        {this.state.selectedPlace !== null && (
                            <Marker position={[this.state.selectedPlace.latitude, this.state.selectedPlace.longitude]}>
                                <Popup>{this.state.selectedPlace.address}</Popup>
                            </Marker>
                        )}
                    </Map>
                </div>
            </div>
        );
    }
}
