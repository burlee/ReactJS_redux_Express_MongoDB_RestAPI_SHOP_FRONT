import React, { Component } from 'react'
import classes from './UserAuctionsList.css'
import axios from 'axios'
import {connect} from 'react-redux'
import Spinner from '../../UI/Spinner/Spinner';

class UserAuctionsList extends Component {
    state = {
        UserAuctionsList: [],
        auctionNotFound: false,
        spinnerIsLoading: true
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
        axios.delete(`https://shop-237ef.firebaseio.com/${this.props.userExist.userExist}/AuctionUserProducts/${idFromFirebase}.json`)
        axios.delete(`http://localhost:3000/offers/${idFromRESTapi}`)

        let updateAuctionList = this.state.UserAuctionsList.filter( auction => {
            return auction.idFromRESTapi !== idFromRESTapi
        })

        this.setState({ UserAuctionsList: updateAuctionList})
    }


    render() {
        let displayUserAuctionsList = null;

        if(this.state.UserAuctionsList.length !== 0){
            displayUserAuctionsList = this.state.UserAuctionsList.map( displayUserAuction => {
                return (
                    <div key={displayUserAuction.id} className={classes.DisplayUserAuction}>
                        <h3>{displayUserAuction.productName}</h3>
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
                )
            })
        }
        return (
            <div className={classes.UserAuctionsList}>
                <h1>Lista twoich aukcji:</h1>
                {displayUserAuctionsList}
                {this.state.auctionNotFound === true ? <h3>Niestety nie posiadasz żadnych aukcji.</h3> : null}
                {this.state.spinnerIsLoading === true ? <Spinner/> : null}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userExist: state.auctionList
});


export default connect(mapStateToProps)(UserAuctionsList);