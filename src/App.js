
import React, { Component } from 'react';
import { withStyles, withTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import NotificationsIcon from '@material-ui/icons/Notifications';
import ExploreIcon from '@material-ui/icons/Explore';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import BuildIcon from '@material-ui/icons/Build';

import Slider from '@material-ui/core/Slider';

import { StaticMap, Marker } from 'react-map-gl';
import ReactMapGL from 'react-map-gl';
//import DeckGL from '@deck.gl/react';
//import DeckGL from 'deck.gl';
import DeckGL from '@deck.gl/react';

import {_MapContext as MapContext, NavigationControl} from 'react-map-gl';


import Pin from './components/pin';


import OpenRouteService from './lib/openRouteService';
import Pyp2Service from './lib/pyp2Service';
import Utils from './lib/utils';

import { PolygonLayer, GeoJsonLayer } from "deck.gl";
import {MapboxLayer} from '@deck.gl/mapbox';
import {TileLayer, MVTLayer } from '@deck.gl/geo-layers';
import {BitmapLayer} from '@deck.gl/layers';

import mapboxgl from 'mapbox-gl';
import InfoPanel from './InfoPanel';
import * as d3 from "d3";

// #import {MVTLayer} from '@deck.gl/geo-layers';

// import {TileLayer} from '@deck.gl/geo-layers';
// import {VectorTile} from '@mapbox/vector-tile';
// import Protobuf from 'pbf';


// Data to be used by the POLYLayer

const drawerWidth = 340;

const PrettoSlider = withStyles({
  root: {
    color: '#3cb9d5',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

const useStyles = theme => ({
 
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    height : '2',
    textAlign : 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 0px',
  
  },
  appBar: {
    
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    opacity: 0.9,
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    background: '#252730',
    width: drawerWidth,
    opacity :0.9
    
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto'
  },
  LogoBox: {
    background: '#2a323c',
    color:"#3cb9d5",
    padding:"10px",
    display: 'flex'
  },
  DrawerPaper:{
    background: '#2a323c',
    margin: 5,
    elevation: 3
  },
  CalcularButton:{
    background: '#3cb9d5'
  },
  SelectedTypeButton:{
    background: '#3cb9d5'
  },
  TypeButton:{
    color: '#3cb9d5'
  },
            


});


// mapbox://styles/mapbox/streets-v11
// mapbox://styles/mapbox/outdoors-v11
//const MAP_STYLE =  'mapbox://styles/mapbox/light-v10'
// mapbox://styles/mapbox/dark-v10
// mapbox://styles/mapbox/satellite-v9
// mapbox://styles/mapbox/satellite-streets-v11
// mapbox://styles/mapbox/navigation-preview-day-v4
// mapbox://styles/mapbox/navigation-preview-night-v4
// mapbox://styles/mapbox/navigation-guidance-day-v4
// mapbox://styles/mapbox/navigation-guidance-night-v4
//const MAP_STYLE = 'mapbox://styles/uberdata/cjfxhlikmaj1b2soyzevnywgs'
//const MAP_STYLE = 'mapbox://styles/uberdata/cjoqbbf6l9k302sl96tyvka09'
//const MAP_STYLE = 'mapbox://styles/mapbox/dark-v9'
//const MAP_STYLE = 'mapbox://styles/mapbox/dark-v9'
const MAP_STYLE = 'mapbox://styles/uberdata/cjoqbbf6l9k302sl96tyvka09'
//const MAP_STYLE = "mapbox://styles/jaavandrex/ck8yu6ii700m91ildfw511cwq"

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiamFhdmFuZHJleCIsImEiOiJjanRoOW9ycm8yYzU3NDNvOTRiMWNjMXNpIn0.Kpr0kyOLSm-kcLcTn0DY9Q';
const INITIAL_VIEW_STATE = {
  longitude: -79.009,
  latitude: -2.9,
  zoom: 14,
  minZoom: 0,
  maxZoom: 20,
  pitch: 0,
  bearing: 0
};
//ORANGE
const COLOR_SCALE_ORANGE = [
  // negative
  [65, 182, 196],
  [127, 205, 187],
  [199, 233, 180],
  [237, 248, 177],
  // positive
  [255, 255, 204],
  [255, 237, 160],
  [254, 217, 118],
  [254, 178, 76],
  [253, 141, 60],
  [252, 78, 42],
  [227, 26, 28],
  [189, 0, 38],
  [128, 0, 38]
];

const COLOR_SCALE_BLUE = [
  // negative
  [65, 182, 196],
  [127, 205, 187],
  [199, 233, 180],
  [237, 248, 177],
  // positive
  [255, 247, 251],
  [236, 231, 242],
  [208, 209, 230],
  [166, 189, 219],
  [116, 169, 207],
  [54, 144, 192],
  [5, 112, 176],
  [4, 90, 141],
  [2, 56, 88]
];
const COLOR_SCALE_S = [
  // negative
  [65, 182, 196],
  [127, 205, 187],
  [199, 233, 180],
  [237, 248, 177],
  // positive
  [213, 62, 79],
  [244, 109, 67],
  [253, 174, 97],
  [254, 224, 139],
  [255, 255, 191],
  [230, 245, 152],
  [171, 221, 164],
  [102, 194, 165],
  [50, 136, 189]
];

const COLOR_SCALE = [
  [65, 182, 196],
  [127, 205, 187],
  [199, 233, 180],
  [237, 248, 177],

  [215, 48, 39],
  [244, 109, 67],
  [253, 174, 97],
  [254, 224, 139],
  [255, 255, 191],
  [217, 239, 139],
  [166, 217, 106],
  [102, 189, 9],
  [26, 152, 80]
];


function colorScaleBK(x) {
  const i = Math.round(x * 9) + 4;
  console.log("x="+x+" i="+i)
  if (x < 0) {
    return COLOR_SCALE[i] || COLOR_SCALE[0];
  }
  return COLOR_SCALE[i] || COLOR_SCALE[COLOR_SCALE.length - 1];
}

const linearScale = d3.scaleLinear().domain([-4, 9]).range([0, 1]);
function colorScale (x) {
    const color = d3.color(d3.interpolateViridis(linearScale(x)));
    return [color.r, color.g, color.b];
}

// function colorScale(x) {
//   const i = Math.round(x * 7) + 4;
//   let color = []
//   if (x < 0) {
//     return color = COLOR_SCALE[i] || COLOR_SCALE[0];
//   }
//   return COLOR_SCALE[i] || COLOR_SCALE[COLOR_SCALE.length - 1];
// }

const hexagon_layer_id = "hexgrid_geojson";
const isochrone_layer_id = "isochrone";

class App extends Component {

  constructor(props){
    super(props)
    this.filtered = false;
    this.OpenRouteService = new OpenRouteService();
    this.Pyp2Service = new Pyp2Service();
    this.utils = new Utils()
    this.state = {
      style: 'mapbox://styles/mapbox/dark-v9',
      marker: {
        latitude: -2.9,
        longitude: -79.009
      },
      items:null,
      layers:[],
      hexaLayer:null,
      hexaData:[],
      isochroneLayer:null,
      time:10,
      profile:"pedestrian",
      hexgrid:null,
      loading:true,
      tabValue:0,
      selectedFeature:null
    };
    this.timeHandleChange = this.timeHandleChange.bind(this);
    this.timeHandleChangeCommit = this.timeHandleChangeCommit.bind(this);
    this.tabHandleChangeCommit = this.tabHandleChangeCommit.bind(this);
  }  
  
  componentDidMount() {
    this.setState({loading:false})
    this.loadHexGrid()
  }


  timeHandleChange(event, newValue) {
    this.setState({time: newValue});
  }

  timeHandleChangeCommit(event, newValue) {
    this.calcular()
  }

  tabHandleChangeCommit(event, newValue){
    this.setState({ tabValue:newValue });
  }

  onStyleChange = style => {
    this.setState({ style });
  };

  _onMarkerDragEnd = event => {
    this.setState({
      marker: {
        longitude: event.lngLat[0],
        latitude: event.lngLat[1]
      }
    });
    this.calcular().then();
  };

  async profileChangeHandle(e, prof){
    e.preventDefault();
    this.setState({
      profile: prof
    }, ()=>{
      this.calcular();
    });
   
  };

  loadHexGrid(){
    this.setState({loading:true})
    this.Pyp2Service.getHexGrid().then(
      res => {
        if(res){
          
          this.setState({hexaData:res.features});
          this.updateHexagonLayer(res.features) 
          this.setState({loading:false})
        }
      }
    );    
  }

  async calcular() {
    this.setState({loading:true})
    this.Pyp2Service.getIsochrones(this.state.marker.latitude, this.state.marker.longitude, this.state.profile, this.state.time  ).then(
        res => {
          if(res){
            res["features"].forEach(element => {
                const polygonData = [
                  {
                    contours: element.geometry.coordinates[0][0],
                    name: "firstPolygon" ,
                    properties : element.properties
                  }
                ];
                this.updateIsochroneLayer(polygonData)
                const hexData = this.utils.intersecHexagonsByIsochrone( this.state.hexaData, polygonData )
                this.filtered=true;
                this.updateHexagonLayer(hexData);
            });
            this.setState({loading:false})
          }else{
            alert("Error api")
            this.setState({loading:false})
          }  
        }
    );
  }

  _onWebGLInitialized = (gl) => {
    this.setState({gl});
  }

  _onMapLoad = () => {
    const map = this._map;
    const deck = this._deck;
    map.addLayer(new MapboxLayer({id: hexagon_layer_id , deck}), 'water'  );
    map.addLayer(new MapboxLayer({id: isochrone_layer_id, deck}), 'water'  );

    const firstLabelLayerId = map.getStyle().layers.find(layer => layer.type === 'symbol').id;
    map.addLayer({
      'id': '3d-buildings',
      'source': 'composite',
      'source-layer': 'building',
      'filter': ['==', 'extrude', 'true'],
      'type': 'fill-extrusion',
      'minzoom': 15,
      'paint': {
          'fill-extrusion-color': '#131c29',

          // use an 'interpolate' expression to add a smooth transition effect to the
          // buildings as the user zooms in
          'fill-extrusion-height': [
              "interpolate", ["linear"], ["zoom"],
              15, 0,
              15.05, ["get", "height"]
          ],
          'fill-extrusion-base': [
              "interpolate", ["linear"], ["zoom"],
              15, 0,
              15.05, ["get", "min_height"]
          ],
          'fill-extrusion-opacity': .9
      }
    }, firstLabelLayerId);

  } 
 
  updateHexagonLayer=(data)=>{
    var hexaLayer = new GeoJsonLayer({
      id: hexagon_layer_id,
      data : data,
      opacity: 1,
      stroked: true,
      getLineWidth: 0.2,
      filled: true,
      extruded: false,
      wireframe: true,
      getElevation: f => { if(f.properties.inIsochrone) return 150; else return 0} ,
      getFillColor: f => { let color = colorScale(f.properties.windex); if(!this.filtered) return color; if(f.properties.inIsochrone) return [...color, 255]; else  return [...color, 0] },
      //getFillColor: d => d.properties.inIsochrone ? [55, 205, 155] : [55, 205, 155,100],
      getLineColor: f => [69,4,87],
      pickable: true,
      onHover: this._onHover,
      pickable: true,
      transitions: {
        // transition with a duration of 3000ms
        getFillColor: 1200,
      },
    })
    this.setState({hexaLayer})
  }

  updateIsochroneLayer=(data)=>{
    const isochroneLayer = new PolygonLayer({
      id: isochrone_layer_id,
      data,
      stroked: true,
      filled: true,
      extruded: true,
      extruded: true,
      getElevation: f => 0.1,
      wireframe: true,
      lineWidthMinPixels: 1,
      getPolygon: d => d.contours,
      getLineColor: [,251,152],
      getFillColor: [250,194,0],
      getLineWidth: 2,
      opacity: 0.0,
      // onHover: ({object, x, y}) => {
      //   const tooltip = `${object}\nPopulation:`;
      //   console.log(object)
      //   /* Update tooltip
      //     http://deck.gl/#/documentation/developer-guide/adding-interactivity?section=example-display-a-tooltip-for-hovered-object
      //   */
      // },
      // onClick: (info,event) =>{
      //   if(info){
      //     // data[info.index].selected = true;
      //     // hoveredObject+=10;
      //     console.log(info)
      //   }
      // }
    });
    this.setState({isochroneLayer})
    
  }


  _onClick = event => {
    // event.x and event.y hold the clicked x and y coordinates in pixels
    // You can pass those coordinates to React Map GL's queryRenderedFeatures
    // to query any desired layers rendered there.
    // Make sure you create the ref on InteractiveMap or StaticMap
    // const features = this.map.queryRenderedFeatures([event.x, event.y], {
    //   layers: [isochrone_layer_id]
    // });
    if(event && event.object && event.object.properties){
      this.setState({selectedFeature:event.object.properties})
    }
    
  };


render() {
  const {gl} = this.state;
  const { classes } = this.props;
  //const { selectedFeature } = this.state;
  const { marker, hexaLayer, isochroneLayer, time, profile, loading, selectedFeature} = this.state;
  const layers = [hexaLayer, isochroneLayer]
  const children = [
    <ToggleButton key={1} value="left">
      1
    </ToggleButton>,
    <ToggleButton key={2} value="center">
      2
    </ToggleButton>,
    <ToggleButton key={3} value="right">
      3
    </ToggleButton>,
  ];
  return (
    <div className={classes.root}>
      <CssBaseline />
      {/* <AppBar position="absolute" className={classes.appBar,  classes.appBarShift} >
        <Toolbar className={classes.toolbar} >
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar> */}
      <Drawer 
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Box component="span" m={1} elevation={3} className={classes.LogoBox} >
          <Box fontWeight="fontWeightBold" fontSize={20}> 
            <ExploreIcon/> LlactaLAB
          </Box>   
          <Box fontWeight="fontWeightBold" fontSize={13} paddingLeft={1} marginTop={1} color="#6b7385"> 
            ciudades sustentables
          </Box>
        </Box>
        <Box padding={1}>
          Proyecto Pies y Pedales  {loading}
          <Divider></Divider>  
          <Box fontWeight="fontWeightBold" fontSize={10} paddingTop={1}  color="#6b7385"> 
            Haz clic en el mapa para consultar el índice de movilidad sustantable calculado para cada hexágono, abajo puedes calcular las áreas de accesibilidad modificando el tiempo de viaje y el medio de transporte.
          </Box>
        </Box>

        {/* <Tabs
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Item One"  />
          <Tab label="Item Two"  />
          <Tab label="Item Three"  />
        </Tabs> */}
        {/* <Paper className={classes.DrawerPaper}>
           <Box padding={1}>
            <FormControl fullWidth >
              <InputLabel htmlFor="standard-adornment-amount">Buscar un lugar</InputLabel>
              <Input
                id="standard-adornment-amount"
              />
            </FormControl>
            <Button
              size="small"
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<SearchIcon />}
              onClick={() => this.loadHexGrid()}
            >
              Buscar
            </Button>
          </Box>  
        </Paper>  */}
        <Paper className={classes.DrawerPaper}>
          <Box padding={1} >
            <Box fontWeight="fontWeightBold" fontSize={12} paddingTop={1}  >
              Calcular accesibilidad
            </Box>
            <Divider></Divider>
            <div>
            <Box color="#6b7385" fontSize={12} paddingTop={1} fontWeight="fontWeightBold">
              Ubicacción: 
              <Pin size={12} />
            </Box>
            <Box fontWeight="fontWeightBold" fontSize={12} paddingLeft={1} marginTop={1} marginBottom={1} color="#6b7385"> 
              Lat: { Math.round(marker.latitude * 1000) / 1000 }
              <span> / </span>
              Lon: { Math.round(marker.longitude * 1000) / 1000 }
            </Box>
              
            </div>
            Profile
            <ButtonGroup size="small" variant="contained" color="secondary" aria-label="contained primary button group" fullWidth>
              <Button onClick={(e, prof = "pedestrian")=> this.profileChangeHandle(e, prof)} className={profile=='pedestrian' && classes.SelectedTypeButton} startIcon={<DirectionsWalkIcon />} ></Button>
              <Button onClick={(e, prof = "bicycle")=> this.profileChangeHandle(e, prof)} className={profile=='bicycle' && classes.SelectedTypeButton} startIcon={<DirectionsBikeIcon />}></Button>
              <Button onClick={(e, prof = "bus")=> this.profileChangeHandle(e, prof)} className={profile=='bus' && classes.SelectedTypeButton} startIcon={<DirectionsBusIcon />}></Button>
            </ButtonGroup>

            <Box color="#6b7385" fontWeight="fontWeightBold" fontSize={12} paddingLeft={1} marginTop={3} marginBottom={1}> 
              Tiempo de recorrido ({time} minutos) 
              <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" value={time} min={1} max={120}  onChange={this.timeHandleChange} onChangeCommitted={this.timeHandleChangeCommit}/>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              className={classes.CalcularButton}
              onClick={() => this.calcular()}
            >
              <BuildIcon></BuildIcon>
              Calcular
            </Button>
          </Box>
        </Paper>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <DeckGL 
            ref={ref => {
              this._deck = ref && ref.deck;
            }}
            initialViewState={INITIAL_VIEW_STATE} 
            ContextProvider={MapContext.Provider} 
            controller={true}
            layers= {layers}
            onWebGLInitialized={this._onWebGLInitialized}
            onClick={this._onClick}
        >
          <div style={{ position: "absolute", right: 30, top: 100 }}>
            <NavigationControl />
            
          </div>
          
          <InfoPanel data={selectedFeature} />      
         
          

          <Marker
              longitude={marker.longitude}
              latitude={marker.latitude}
              offsetTop={-50}
              offsetLeft={-25}
              draggable
              onDragEnd={this._onMarkerDragEnd}
            >
              <Pin size={50} />
            </Marker>

         {gl && (
          <StaticMap
            ref={ref => {
              this._map = ref && ref.getMap();
            }}
            gl={gl}
            mapStyle={MAP_STYLE}
            mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
            onLoad={this._onMapLoad}
            
          />
  
        )}   
        </DeckGL>
        
      </main>
    </div>
  );
}
}
export default withStyles(useStyles)(App)