import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';

class ZmitiIndexApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			beginTest:false,
			imgW:0,
			transformY:0
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {

		var conponent = null;
			//console.log(this.state.imgW /2 - this.viewH)

		var bgStyle = {
			height:this.state.imgH,
			WebkitTransform:'translate3d(0,'+this.state.transformY+'px,0)'
		}
		


		return (
			<div onTouchStart={e=>{e.preventDefault()}} className={'zmiti-index-main-ui '+(this.state.hideIndex?'hide':'')}>
				<div
			className='zmiti-index-bg lt-full' style={bgStyle} >
					<img src='./assets/images/bg.png' ref='zmiti-index-bg'/>
				</div>
				<div onTouchStart={this.boatMove.bind(this)} className="zmiti-index-container">
				    <div className="zmiti-index-dot"></div>
				    <div className="zmiti-index-pulse"></div>
				</div>
				<div className='zmiti-loong'>
					<img src='./assets/images/long.png'/>
				</div>
			</div>
		);
	}


	boatMove(){
		this.lastTime = this.lastTime || new Date().getTime();
		if(-this.state.transformY >= this.state.imgH - this.viewH){
			return;
		};
		var scale = 1;
		if(new Date().getTime() - this.lastTime>0){

			scale = 2000/(new Date().getTime() - this.lastTime);
			//console.log(500/(new Date().getTime() - this.lastTime));
		}
		this.setState({
			transformY:this.state.transformY-scale
		})

		this.lastTime =  new Date().getTime();
		return false;
	}
 


	componentDidMount() {
		this.setState({
			imgH:this.refs['zmiti-index-bg'].offsetHeight
		});

		
	}
}
export default PubCom(ZmitiIndexApp);