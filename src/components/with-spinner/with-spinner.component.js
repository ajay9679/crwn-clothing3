import React from 'react';
import Spinner from '../spinner/spinner.component.js';

const WithSpinner = WrappedComponent => {
	const SpinnerC = ({isLoading, ...otherProps}) => {
		return isLoading ? <Spinner /> : <WrappedComponent {...otherProps} />
	};

	return SpinnerC;
};

export default WithSpinner;
