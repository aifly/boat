import React, { Component } from 'react';
import {PubCom} from '../components/public/pub.jsx';
import './assets/css/index.css';
import $ from 'jquery';

class ZmitiIndexApp extends Component {
	constructor(props) {
		super(props);
		this.state={
			beginTest:false
		};
		this.viewW = document.documentElement.clientWidth;
		this.viewH = document.documentElement.clientHeight;
	}

	render() {

		var conponent = null;
			

		return (
			<div className={'zmiti-index-main-ui '+(this.state.hideIndex?'hide':'')}>
				{conponent}
			</div>
		);
	}

	beginTest(){

		let {obserable} = this.props;
		this.setState({
			btnClick:true
		})
		setTimeout(()=>{
			this.setState({
				beginTest:true,
				btnClick:false,
			});

			setTimeout(()=>{
				this.setState({
					hideIndex:true
				})
				obserable.trigger({
					type:'toggleContent',
					data:true
				})
			},500)
		},200)
	}


	componentDidMount() {

	}
}
export default PubCom(ZmitiIndexApp);