import React, { useState } from 'react';
import styles from './Coin.module.css';



const Coin = ({coin, removeCoin}) => {

    const handleRemoveCoin = () => {
        removeCoin(coin.id);
    }

    return ( 
        <div className={styles.coinCard}>      
            <div className={styles.flex + ' ' + styles.spaceBetween}>
                <img className={styles.logo} src={coin.image} width='60px'/>       
                <div className={styles.flexcolumn + ' ' + styles.aligntextleft}>
                    <h2>{coin.name}</h2>
                    <h4 style={{opacity: 0.8}}>{coin.symbol}</h4>
                </div>
            </div> 
            <div className={styles.flex}> 
                <div style={{ marginRight: 30, textAlign: "right"}} className={styles.flexcolumn}>
                    <h2>${coin.current_price}</h2>     
                    <div className={styles.flex}>  
                        {coin.price_change_percentage_24h > 0 ? 
                        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#00c000"><rect fill="none" height="24" width="24"/><path d="M9,5v2h6.59L4,18.59L5.41,20L17,8.41V15h2V5H9z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#ff0000"><rect fill="none" height="24" width="24"/><path d="M19,9h-2v6.59L5.41,4L4,5.41L15.59,17H9v2h10V9z"/></svg>}

                        <h4 className={coin.price_change_percentage_24h > 0 ? styles.green : styles.red}>{coin.price_change_percentage_24h}%</h4>
                    </div>
                </div>
            </div>

            <div className={styles.closeButton} onClick={handleRemoveCoin}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000" className={styles.svg}><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
            </div>
        </div> 
    ); 
}
 
export default Coin;