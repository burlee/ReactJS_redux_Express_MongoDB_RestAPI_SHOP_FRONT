import React, { Component } from 'react'
import classes from './UserAuctionsList.css'
import axios from 'axios'
import {connect} from 'react-redux'

class UserAuctionsList extends Component {
    state = {
        UserAuctionsList: [],
        commonUserAuctionsArray: [],
        auctionNotFound: false
    }

    componentDidMount() {
        axios.get(`https://shop-237ef.firebaseio.com/${this.props.userExist.userExist}/AuctionUserProducts.json`)
            .then( response => {
                const updateUserAuctionList = [];
                for(let key in response.data){
                    updateUserAuctionList.push({
                        id: key,
                        condition: response.data[key].condition,
                        productImgUrl: response.data[key].productImgUrl,
                        productName: response.data[key].productName,
                        productPrice: response.data[key].productPrice,
                        uniqueID: response.data[key].uniqueID
                    })
                }
                this.setState({UserAuctionsList: updateUserAuctionList})
            })
            .then( () => {
                axios.get(`http://localhost:3000/offers/`)
                    .then( response =>{
                        response.data.products.forEach( res => {
                            this.state.UserAuctionsList.forEach( userAuction => {
                                if(userAuction.uniqueID === res.uniqueID){
                                    const finishARRAY = [];
                                    // for(let key in response.data.products){
                                    //     finishARRAY.push({
                                    //         RESTapiID: response.data.products[key].id
                                    //     })
                                    // }
                                    for(let key in response.data.products && this.state.UserAuctionsList ){
                                        finishARRAY.push({
                                            RESTapiID: response.data.products[key].id,
                                            FirebaseID: this.state.UserAuctionsList[key].id,
                                            commonID: this.state.UserAuctionsList[key].uniqueID,
                                            productName: response.data.products[key].productName,
                                            productPrice: response.data.products[key].productPrice,
                                            productImgUrl: response.data.products[key].productImgUrl,
                                            condition: response.data.products[key].condition,
                                        })
                                    }
                                    this.setState({commonUserAuctionsArray: finishARRAY})
                                }
                            })
                        })
                    })
                    .then(() => {
                        if(this.state.commonUserAuctionsArray.length === 0){
                            this.setState({auctionNotFound: true})
                        }
                    })
                }
            )
            .catch( error => console.log(error))

        
    }
    deleteUserAuction = (idFromFirebase, idFromRESTapi) =>{
        axios.delete(`https://shop-237ef.firebaseio.com/${this.props.userExist.userExist}/AuctionUserProducts/${idFromFirebase}.json`)
        axios.delete(`http://localhost:3000/offers/${idFromRESTapi}`)
    }
    render() {
        let displayUserAuctionsList = null;

        if(this.state.commonUserAuctionsArray.length !== 0){
            displayUserAuctionsList = this.state.commonUserAuctionsArray.map( displayUserAuction => {
                // console.log( displayUserAuction )
                return (
                    <div key={displayUserAuction.FirebaseID} className={classes.DisplayUserAuction}>
                        <span>{displayUserAuction.condition}</span>
                        <span>{displayUserAuction.uniqueID}</span>
                        <button onClick={() => this.deleteUserAuction(displayUserAuction.FirebaseID, displayUserAuction.RESTapiID)}>Usun swoja aukcję</button>
                    </div>
                )
            })
        }
        return (
            <div className={classes.UserAuctionsList}>
                {displayUserAuctionsList}
                {this.state.auctionNotFound === true ? <h1>Nie znaleziono aukcji</h1> : null}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userExist: state.auctionList
});


export default connect(mapStateToProps)(UserAuctionsList);