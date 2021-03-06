import React, {Component} from 'react'
import { render } from 'react-dom'
import mapboxgl from 'mapbox-gl'

class Registry extends Component {

  constructor() {
    super()
    this.state = {
      name:'',
      nit:'',
      address:'',
      emailAdmin:'',
      password:'',
      lat:'',
      lng:'',
      confirmPassword:'',
      lng : -74.084072,
      lat : 4.615096,
      availableBeds:0,
      covidSicks:0,
      category:1,
      zoom : 15,
      status:[]
    }
    this.addTask = this.addTask.bind(this)
    this.handleChange = this.handleChange.bind(this)
}

addTask(e){
  
    console.log(this.state)
    fetch('http://181.54.182.7:5000/api/hospitals/',
    {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers: {
            Accept : 'application/json',
            'Content-Type' : 'application/json'
        }
    }).then(function (res){return res.json()})
      .then((posts) => {
        console.log(posts)
        if(posts.status==="Hospital was add"){
         window.open('http://181.54.182.7:5000/login','_blank')
         }else if(posts.status==="Hospital already exist"){
          alert("el hospital que quiere registrar ya existe")
        }
      }
      )
      .catch((err)=>{console.log(err)})

      
    }


handleChange(e){
  const {name, value}= e.target

  this.setState({
    [name]:value
  }
  )
}


componentDidMount(){
  const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
      });
      
      const marker = new mapboxgl.Marker()
                         .setLngLat([this.state.lng,this.state.lat])
                         .addTo(map)
      

      map.on('move',()=>{
          this.setState({
              lng: map.getCenter().lng.toFixed(4),
              lat: map.getCenter().lat.toFixed(4)
          })
          marker.remove()
          marker.setLngLat([this.state.lng,this.state.lat]).addTo(map)
      })
}

  
render(){
    return(
      <div style={{paddingLeft:"20%"}}>
        <div className="row" >
            <h1 style={{fontFamily:"Roboto"}}>Registro atiendeMe Hospital</h1>
            <div className="col s8" style={{paddingLeft:"5%"}}>
            <div className = "card z-depth-2">
                <div className="card-content">
                  <div className="row">
                      <div className="input-field col s10" style={{paddingLeft:"20%"}}>
                      <form>
                        <input 
                        onChange={this.handleChange}
                        value={this.state.name}
                        name="name" type="text" placeholder="Nombre hospital"/>
                        <input 
                        onChange={this.handleChange}
                        value={this.state.nit}
                        name="nit" type="text" placeholder="Nit"/>
                        <input 
                        onChange={this.handleChange}
                        value={this.state.category}
                        name="category" type="text" placeholder="categoria hospital 1) covid 2) medicina  general 3) odontologia"/>
                        <input
                        onChange={this.handleChange}
                        value={this.state.address}
                        name="address" type="text" placeholder="Direccion hospital"/>
                        <input
                        onChange={this.handleChange}
                        value={this.state.emailAdmin}
                        name="emailAdmin" type="text" placeholder="Email administrador"/>
                        <input 
                        onChange={this.handleChange}
                        value={this.state.password}
                        name ="password" type="password" placeholder="Contaseña"/>
                        <input 
                        onChange={this.handleChange}
                        value={this.state.confirmPassword}
                        name={"confirmPassword"}
                        type="password" placeholder="Contraseña contaseña"/>
                        <span> Ubica tu hospital:</span>
                        </form>
                      </div>

                      <div style={{paddingLeft: "20%"}}>
                <div className="sliderStyle">
                    <div ref={el => this.mapContainer = el} style={{
                            width:500,
                            height:500
                            }}/>
                        
                    </div>
                    </div>
                      <div style={{paddingTop: "3%"}}>
                        <a href="/login">
                        <button
                            className="btn blue lighten-3"
                              style={{
                                marginRight:"15%",
                                marginLeft:"25%"
                            }} 
                            
                          >Regresar</button></a>
                          <a>
                          <button
                              onClick={()=>{
                                if(this.state.addresss === "" || this.state.name === "" || this.state.nit === "" || this.state.password === "" || this.state.confirmPassword === ""){
                                  alert('Faltan datos por ser insertados')
                                  return
                                }

                                if(this.state.password !== this.state.confirmPassword){
                                  alert('las contraseñas no considen')
                                  return
                                }
                                
                                this.addTask()
                                console.log(this.state)
                            }} 
                            className="btn blue"
                          >Completar</button></a>
                      </div>
                      
                  </div>
                </div>
              </div>
            </div>
            
          </div>
      </div> 
        )
    }

}



export default Registry;