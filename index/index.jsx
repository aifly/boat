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
			height:this.viewW,
			marginTop: this.state.imgW /2 - this.viewH,
			WebkitTransform:'translate3d(0,'+this.state.transformY+'px,0)'
		}
		if(this.state.imgW>0){
			bgStyle.marginLeft = - (this.state.imgW - this.viewW) / 2;
		}

		return (
			<div className={'zmiti-index-main-ui '+(this.state.hideIndex?'hide':'')}>
				<div
			className='zmiti-index-bg' style={bgStyle} >
					<img   src='./assets/images/index.jpg' ref='zmiti-index-bg'/>
				</div>
			</div>
		);
	}
 


	componentDidMount() {
		this.setState({
			imgW:this.refs['zmiti-index-bg'].offsetWidth
		});

		this.timer = setInterval(()=>{
			if(-this.state.transformY>=this.state.imgW - this.viewH - this.viewW){
				clearInterval(this.timer);
			}
			this.setState({
				transformY:this.state.transformY - 2
			});
		},20)
	}
}
export default PubCom(ZmitiIndexApp);