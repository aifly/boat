import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';

import AlloyTouch from 'alloytouch';
import Transform from 'alloytouch/transformjs/transform';
class ZmitiIndexApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			beginTest:false,
			imgH:0,
			transformY:-1000,
			iNow:0,
			isMove:false,
			scaleLogo:false
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {

		var conponent = null;
			//console.log(this.state.imgW /2 - this.viewH)

		var bgStyle = {
			height:this.state.imgH,
		}
		return (
			<div onTouchStart={e=>{e.preventDefault()}} ref='zmiti-index-main-ui' className={'zmiti-index-main-ui '+(this.state.hideIndex?'hide':'')}>
				<div className='zmiti-index-bg lt-full' style={{height:this.viewH,overflow:'hidden'}}>
					<div  ref='zmiti-index-bg-C' style={bgStyle}>
						<div>
							<img src='./assets/images/bg1.png' ref='zmiti-index-bg'/>

							{window.textArr.map((item,i)=>{

								return <div key={i} className='zmiti-place-intro' style={{top:(i+1)*this.state.imgH/8 + 300,opacity:this.state.iNow === i ? 1: 0}}>
											<aside>
												<header>{item[0]}</header>
												<div className='zmiti-place-img'>
													<img src={item[2]}/>
												</div>
											</aside>
											<aside>
												<div>
													{item[1]}
												</div>
											</aside>
										</div>
							})}
							
						</div>
					</div>
				</div>
				{/*<div onTouchStart={this.boatMove.bind(this)} className="zmiti-index-container">
				    <div className="zmiti-index-dot"></div>
				    <div className="zmiti-index-pulse"></div>
				</div>*/}

				<div className={'zmiti-index-logo '+(this.state.scaleLogo?'active':'')}>
					<img src='./assets/images/logo.png'/>
				</div>
				<div className={'zmiti-index-text  '+ (this.state.scaleLogo?'active':'')+(this.state.beginGame?' hide':'')}>
					赛龙舟是中国民间传统水上体育娱乐项目，已有两千多年历史，很多地方在端午节都有赛龙舟的传统。
				</div>
				<div onTouchTap={this.beginGame.bind(this)} className={'zmiti-index-begin-btn '+(this.state.tap?'active':'') + (this.state.scaleLogo?' show':'')}>开始</div>
				<div className='zmiti-loong'>
					<img src={'./assets/images/long.'+(this.state.isMove?'gif':'png')}/>
				</div>
			</div>
		);
	}


	beginGame(){
		this.setState({
			tap:true,
			beginGame:true
		});
		setTimeout(()=>{

			this.setState({
				tap:false
			});

		},200)
	}
 

	componentDidMount() {

		this.iNow = 1;//
		var height = this.refs['zmiti-index-bg'].offsetHeight;

		this.singleH = height / 8;
		this.setState({
			imgH:height
		});
		var s = this;


		setTimeout(()=>{
			this.setState({
				scaleLogo:true
			})
		},1000)

		setTimeout(()=>{
			Transform(this.refs['zmiti-index-bg-C'],true);
			var touch = new AlloyTouch({
				touch:s.refs['zmiti-index-main-ui'],//反馈触摸的dom
				target: s.refs['zmiti-index-bg-C'], //运动的对象
				property: "translateY",  //被运动的属性
				min: this.viewH - this.state.imgH, //不必需,运动属性的最小值
	            max: 0, //不必需,滚动属性的最大值
	            sensitivity: 1,//不必需,触摸区域的灵敏度，默认值为1，可以为负数
	            factor: 1,//不必需,表示触摸位移与被运动属性映射关系，默认值是1
	            step: 45,//用于校正到step的整数倍
	            bindSelf: false,
	            initialValue: 0,
	            change:function(value){ 
	            	s.setState({
	            		iNow : - ((value+340) / s.singleH |0)
	            	})
	            }, 
	            touchStart:function(evt, value){ 
	            	s.setState({
	            		isMove:true
	            	})
	            },
	            touchMove:function(evt, value){  },
	            touchEnd:function(evt,value){  },
	            tap:function(evt, value){  },
	            pressMove:function(evt, value){  },
	            animationStart:function(){
	            	
	            },
	            animationEnd:function(value){
					s.setState({
	            		isMove:false
	            	})
	              } //运动结束
			});
	},100)
	}
}
export default PubCom(ZmitiIndexApp);