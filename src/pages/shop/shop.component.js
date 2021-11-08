import React from 'react';

import {Route} from 'react-router-dom';
import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils.js';

import CollectionsOverview from '../../components/collections-overview/collections-overview.components.js';
import CollectionPage from '../collection/collection.component.js';
import WithSpinner from '../../components/with-spinner/with-spinner.component.js';

import {connect} from 'react-redux';
import {updateCollections} from '../../redux/shop/shop.actions.js';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component{
	state = { loading: true };
	unsubscribeFromSnapshot = null;

	componentDidMount(){
		const collectionRef = firestore.collection('collections');
		collectionRef.onSnapshot(async snapShot => {
			const collectionsMap = convertCollectionsSnapshotToMap(snapShot)
			this.props.updateCollections(collectionsMap);
			this.setState({loading: false});
		});
	}

	render(){
		const {match} = this.props;

		return <div className='shop-page'>
			<Route exact path={`${match.path}`} render={props => <CollectionsOverviewWithSpinner isLoading={this.state.loading} {...props} />} />
			<Route path={`${match.path}/:collectionId`} render={props => <CollectionPageWithSpinner isLoading={this.state.loading} {...props} />} />
		</div>
	}
}

const mapDispatchToProps = dispatch => ({
	updateCollections: collections => dispatch(updateCollections(collections)),
});

export default WithSpinner(connect(null, mapDispatchToProps)(ShopPage));
