import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';

//import AlloyTouch from 'alloytouch';
//import Transform from 'alloytouch/transformjs/transform';
class ZmitiIndexApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			beginTest:false,
			imgH:0,
			transformY:[0,0,0,0,0,0,0],
			iNow:-1,
			opacity:[1],
			isMove:true,
			rotate:23,
			top:0,
			scaleLogo:false
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
		this.rotate =[];
		window.textArr.map((item,i)=>{
			this.rotate.push(Math.random()*35|0);
		})
	}

	render() {

		var conponent = null;
			//console.log(this.state.imgW /2 - this.viewH)

		var bgStyle = {
			height:this.state.imgH,
			position:'relative',
			WebkitTransform:'translate3d(0,'+this.state.top+'px,0)'
		}
		var className = '';
		if(this.state.showLong){
			className = 'active';
		}
		if(this.state.longDone){
			className ='done'
		}
		return (
			<div onTouchStart={e=>{e.preventDefault()}} ref='zmiti-index-main-ui' className={'zmiti-index-main-ui '+(this.state.hideIndex?'hide':'')}>
				<div className='zmiti-index-bg lt-full' style={{height:this.viewH,overflow:'hidden'}}>
					<div  ref='zmiti-index-bg-C' style={bgStyle}>
						<div>
							<img src='./assets/images/bg2.png' ref='zmiti-index-bg'/>

							<footer className='zmiti-footer'>
								{window.footerText}
							</footer>
							<footer className='zmiti-copyright'>
								{window.chupinArr.map((item,i)=>{
									return <div key={i}>{item}</div>
								})}
							</footer>
							{window.textArr.map((item,i)=>{

								return <div key={i} className='zmiti-place-intro' style={{top:(i+1)*this.state.imgH/8 + 200,opacity:this.state.iNow === i ? 1 : 0}}>
										<aside>
											<header>{item[0]}</header>
											<div  className={'zmiti-place-text '+(this.state.iNow>=i?'active':'')}>
												{item[1]}
											</div>
											<span></span>
											<span></span>
										</aside>
										
									</div>
							})}

							<div className='zmiti-xh-logo'>
								<img src='./assets/images/zmiti.png'/>
							</div>

							<div onTouchTap={this.refresh.bind(this)} className='zmiti-refresh'>
								<img src='./assets/images/refresh.png'/>
							</div>


							<div>
								{window.textArr.map((item,i)=>{

								return <div key={i} className='zmiti-place-pic' style={{top:(i+1)*this.state.imgH/8 + this.viewH - 400,opacity:1,WebkitTransform:'translate3d(0,'+(this.state.transformY[i])+'px,0) rotate('+(this.rotate[i])+'deg)'}}>
											<img src={item[2]}/>
										</div>
								})}
							</div>

							{window.textArr.map((item,i)=>{

								return <div key={i} className='zmiti-place-intro zmiti-place-intro1' style={{top:(i+1)*this.state.imgH/8 + 200,opacity:this.state.iNow === i ? 0:1}}>
										<aside>
											<header >{item[0]}</header>
											<span></span>
											<span></span>
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
					<span>智</span><span>媒</span>
					{this.state.scaleLogo && window.desc.split('').map((item,i)=>{
						return <span key={i} style={{WebkitAnimationDelay:(i+2)*105+'ms'}} className={this.state.scaleLogo?'bounceInDown':''}>{item}</span>
					})}
				</div>
				<div onTouchTap={this.beginGame.bind(this)} className={'zmiti-index-begin-btn '+(this.state.tap?'active':'') + (this.state.showStartBtn?' show':'')}>开始</div>
				<div className={'zmiti-loong '+ className}>
					<img src={'./assets/images/long.'+(this.state.isMove?'gif':'png')}/>
				</div>
				{!this.state.longDone && false &&  this.state.beginGame && <span className='zmiti-info'><img src='./assets/images/info.png'/></span>}
				<audio ref='tap' src='./assets/music/tap.mp3' loop></audio>
				<audio ref='bgsound' autoPlay src='./assets/music/bgsound.mp3' loop></audio>
			</div>
		);
	}


	refresh(){
		this.setState({
			iNow:-1,
			isMove:true,
			top:0,
			scaleLogo:true,
			longDone:false,
			beginGame:false,
			showStartBtn:false
		});

		this.isStart = false;

		setTimeout(()=>{
			this.setState({
				scaleLogo:true
			});
			setTimeout(()=>{
				this.setState({
					showStartBtn:true
				})
			},4000)
		},2000);
	}


	beginGame(){
		var s = this;
		this.setState({
			tap:true,
			beginGame:true,
			isMove:true

		});

		this.refs['tap'].play();
		this.refs['bgsound'].pause();
		setTimeout(()=>{

			this.setState({
				tap:false,
				showStartBtn:false,
				showLong:true
			});

			

			this.isStart = true;

			var render = ()=>{
				var iNow = - ((s.state.top+340) / s.singleH |0) ;
				var top = s.state.top - window.speed;
				top <= this.viewH - this.state.imgH &&(top = this.viewH - this.state.imgH );
				s.state.top =top ;
				s.state.iNow = iNow;
				var y =  top % s.singleH;
				if(top < - this.singleH){
					//s.state.transformY[iNow-1] = y / 4;
				}



				s.forceUpdate();
				if(-s.state.top % this.singleH <= window.speed && -s.state.top / this.singleH>1 ){
					this.isStart = false;
					this.setState({
						isMove:false
					});

					this.refs['tap'].pause();
					this.refs['bgsound'].play();

					if(iNow >= window.textArr.length ){
						s.setState({
							longDone:true
						})
					}

					setTimeout(()=>{
						this.isStart = true;
						this.setState({
							isMove:true
						});
						this.refs['tap'].play();
						this.refs['bgsound'].pause();
						render();						
						
					},3000)
				}
				
				this.isStart && webkitRequestAnimationFrame(render);
			};

			webkitRequestAnimationFrame(render);
			/*Transform(this.refs['zmiti-index-bg-C'],true);
			this.touch = new AlloyTouch({
				touch:s.refs['zmiti-index-main-ui'],//反馈触摸的dom
				target: s.refs['zmiti-index-bg-C'], //运动的对象
				property: "translateY",  //被运动的属性
				min: this.viewH - this.state.imgH + this.singleH, //不必需,运动属性的最小值
	            max: 0, //不必需,滚动属性的最大值
	            sensitivity: 1,//不必需,触摸区域的灵敏度，默认值为1，可以为负数
	            factor: 1,//不必需,表示触摸位移与被运动属性映射关系，默认值是1
	            step: 45,//用于校正到step的整数倍
	            bindSelf: false,
	            initialValue: 0,
	            change:function(value){


	            	
	            	var iNow = - ((value+340) / s.singleH |0) ;

	            	var rotate =  - value % 45 ;

	            	//rotate < 0 && (rotate = 0);
	            	var opacity = 1 +  ((value + s.singleH) %s.singleH) /  s.singleH;

	            	opacity<=0 &&( opacity = 0);
	            	s.state.iNow = iNow;
	            	s.state.transformY[iNow] = 0;// (value+s.singleH)%s.singleH;
	            	s.state.opacity[iNow] = opacity;
	            	s.forceUpdate();

	            }, 
	            touchStart:function(evt, value){ 
	            	s.setState({
	            		isMove:true
	            	});
	            	if(s.refs['tap'] && s.refs['tap'].paused){
						s.refs['tap'].play();
					};
	            },
	            touchMove:function(evt, value){  },
	            touchEnd:function(evt,value){  },
	            tap:function(evt, value){  },
	            pressMove:function(evt, value){  },
	            animationStart:function(){
	            	
	            },
	            animationEnd:function(value){
	            	if(s.refs['tap'] && !s.refs['tap'].paused){
						s.refs['tap'].pause();
					};
	            	if(value <= s.viewH - s.state.imgH + s.singleH){
						s.touch.to(s.viewH - s.state.imgH,3000,function(e){
							return e;
						});

						s.setState({
							longDone:true
						})

	            		return;
	            	}

					s.setState({
	            		isMove:false
	            	});
	              } //运动结束
			});
			this.touch.to( - this.singleH ,5000,function (x) {
			  return x;
			});*/


		},2000)
	}
 

	componentDidMount() {


		$(document).one('touchstart',()=>{
			this.refs['bgsound'].pause();
			this.refs['bgsound'].muted = true;
			this.refs['bgsound'].play();
			setTimeout(()=>{
				this.refs['bgsound'].muted = false;
			},500);
			
		})
		this.iNow = 1;//


		var height = this.refs['zmiti-index-bg'].offsetHeight;

		this.singleH = height / 8;
		this.setState({
			imgH:height,

		});

		setTimeout(()=>{
			this.setState({
				iNow:0
			})
		},4000)
		var s = this;


		setTimeout(()=>{
			this.setState({
				scaleLogo:true
			});
			setTimeout(()=>{
				this.setState({
					showStartBtn:true
				})
			},4000)
		},2000);
 
	}
}
export default PubCom(ZmitiIndexApp);