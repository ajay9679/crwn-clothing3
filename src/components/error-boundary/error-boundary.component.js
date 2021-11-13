import React from 'react';

class ErroBoundary extends React.Component{
	constructor(){
		super();
		this.state = {
			hasErrored: false,
		}
	}

	static getDerivedStateFromError(error){
		return {
			hasErrored: true,
		}
	}

	componentDidCatch(error, info){
		console.log(error);
		console.log(info);
	}

	render(){
		if(this.state.hasErrored)
			return <div>something went wrong!</div>
		return this.props.children;
	}
}

export default ErroBoundary;
