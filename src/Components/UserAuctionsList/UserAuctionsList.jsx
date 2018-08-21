import React, { Component } from 'react'
import classes from './UserAuctionsList.css'
import axios from 'axios'
import {connect} from 'react-redux'
import SmallSpinner from '../../UI/SmallSpinner/SmallSpinner';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

class UserAuctionsList extends Component {
    state = {
        UserAuctionsList: [],
        auctionNotFound: false,
        spinnerIsLoading: true,
        spinnerIsLoadingDelete: false
    }

    componentDidMount() {
        
        axios.get(`https://shop-237ef.firebaseio.com/${this.props.userExist.userExist}/AuctionUserProducts.json`)
            .then( response => {
                const updateUserAuctionList = [];
                for(let key in response.data){
                    updateUserAuctionList.push({
                        id: key,
                        idFromRESTapi: response.data[key].idFromRestAPI,
                        condition: response.data[key].condition,
                        productImgUrl: response.data[key].productImgUrl,
                        productName: response.data[key].productName,
                        productPrice: response.data[key].productPrice,
                        uniqueID: response.data[key].uniqueID,
                        time: response.data[key].time
                    })
                }
                this.setState({UserAuctionsList: updateUserAuctionList})
            })
            .then(() => {
                if(this.state.UserAuctionsList.length === 0){
                    this.setState({auctionNotFound: true})
                }
                this.setState({spinnerIsLoading: false})
            })
            .catch( error => console.log(error))

        
    }
    deleteUserAuction = (idFromFirebase, idFromRESTapi) =>{
        this.setState({spinnerIsLoadingDelete: true})

        axios.delete(`https://shop-237ef.firebaseio.com/${this.props.userExist.userExist}/AuctionUserProducts/${idFromFirebase}.json`)
            .then(()=> this.setState({spinnerIsLoadingDelete: false}))
        axios.delete(`http://localhost:3000/offers/${idFromRESTapi}`)

        let updateAuctionList = this.state.UserAuctionsList.filter( auction => {
            return auction.idFromRESTapi !== idFromRESTapi
        })

        this.setState({ UserAuctionsList: updateAuctionList})
    }


    render() {
        const transitionOption = {
            transitionName: "fade",
            transitionEnterTimeout: 500,
            transitionLeaveTimeout: 1000
        }

        let displayUserAuctionsList = null;

        if(this.state.UserAuctionsList.length !== 0){
            displayUserAuctionsList = this.state.UserAuctionsList.map( displayUserAuction => {
                return (
                    <div key={displayUserAuction.id} className={classes.DisplayUserAuction}>
                        <h3>{displayUserAuction.productName}</h3>
                        <div className={classes.AuctionBox}>
                            <div className={classes.AuctionDetails}>
                                <span>Cena: {displayUserAuction.productPrice}PLN</span>
                                <span>Stan: {displayUserAuction.condition}</span>
                                <span>Czas dodania: {displayUserAuction.time}</span>
                                <button onClick={() => this.deleteUserAuction(displayUserAuction.id, displayUserAuction.idFromRESTapi)}>Zakończ aukcję</button>
                            </div>
                            <div className={classes.ImgContainer}>
                                <img src={displayUserAuction.productImgUrl} alt={displayUserAuction.productName}/>
                            </div>
                        </div>
                    </div>
                )
            })
        }
        return (
            <div className={classes.UserAuctionsList}>
                {this.state.spinnerIsLoadingDelete ? <SmallSpinner/> : null}
                <h1>Lista twoich aukcji:</h1>
                <ReactCSSTransitionGroup style={{ overflowX: 'auto', width: '100%'}} {...transitionOption}>
                    {displayUserAuctionsList}
                </ReactCSSTransitionGroup>
                {this.state.auctionNotFound === true ? <h3>Niestety nie posiadasz żadnych aukcji.</h3> : null}
                {this.state.spinnerIsLoading === true ? <SmallSpinner/> : null}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userExist: state.auctionList
});


export default connect(mapStateToProps)(UserAuctionsList);