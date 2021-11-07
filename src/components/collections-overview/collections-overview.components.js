import React from 'react';

import {CollectionsOverviewContainer} from './collections-overview.styles.js';
import CollectionPreview from '../collection-preview/collection-preview.component.js';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCollectionsForPreview} from '../../redux/shop/shop.selectors.js';

const CollectionsOverview = ({collections}) => {
	return <CollectionsOverviewContainer>
		{
			collections.map(({id, ...otherCollectionProps}) => <CollectionPreview key={id} {...otherCollectionProps} />)
		}
	</CollectionsOverviewContainer>
};

const mapStateToProps = createStructuredSelector({
	collections: selectCollectionsForPreview,
});

export default connect(mapStateToProps)(CollectionsOverview);
