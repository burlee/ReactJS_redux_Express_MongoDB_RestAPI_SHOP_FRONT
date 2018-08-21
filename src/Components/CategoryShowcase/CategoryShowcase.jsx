import React, { Component } from 'react'
import classes from './CategoryShowcase.css'

export default class CategoryShowcase extends Component {
    state = {
        borderBottom: 'gray'
    }

    render() {
        return (
            <div className={classes.CategoryShowcase}>
                <div className={classes.Category} style={{ backgroundImage: `url(http://www.mobileworldni.com/wp-content/uploads/2017/10/iphone6s-gold-select-2015-400x400.jpg)` }} >
                    <h1>Elektronika</h1>
                </div>
                <div className={classes.Category} style={{ backgroundImage: `url(http://www.avangard-ogrody.pl/wp-content/uploads/2016/02/DSC07113-400x400.jpg)` }} >
                    <h1>Ogród</h1>
                </div>
                <div className={classes.Category} style={{ backgroundImage: `url(https://archiwum.allegro.pl/image//imagesNEW/big/394fc54857e7d09c6e4ddbed804a784125bb9ebffb39d3025d2e1a7b2da7a0b7` }} >
                    <h1>Ubrania</h1>
                </div>
                <div className={classes.Category} style={{ backgroundImage: `url(http://wayc-legnica2011.pl/wp-content/uploads/2015/11/wyposazenie-kuchni-w-domu-jednorodzinnym_2.jpg)` }} >
                    <h1>Wyposażenie domu</h1>
                </div>
                <div className={classes.Category} style={{ backgroundImage: `url(http://static.e-mieszkanie.pl/art/6050_small.jpg)` }} >
                    <h1>Samochody</h1>
                </div>
                <div className={classes.Category} >
                    <h1>Inne</h1>
                </div>
            </div>
        )
    }
}
