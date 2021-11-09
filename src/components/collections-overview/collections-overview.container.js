import React from 'react';

import WithSpinner from '../with-spinner/with-spinner.component.js';
import CollectionsOverview from './collections-overview.components.js';

import {compose} from 'redux';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectIsCollectionFetching} from '../../redux/shop/shop.selectors.js';

const mapStateToProps = createStructuredSelector({
	isLoading: selectIsCollectionFetching,
});

// const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview));
// or

const CollectionsOverviewContainer = compose(connect(mapStateToProps), WithSpinner)(CollectionsOverview);

export default CollectionsOverviewContainer;
