import React from "react";
import styles from './UntrackedCoin.module.css';



const UntrackedCoin = ({coin, addCoin}) => {

    const handleAddCoin = () => {
        addCoin(coin.id);
    }

    return ( 
        <div onClick={handleAddCoin} className={styles.coinGridCard}>
            <div className={styles.flex + ' ' + styles.spaceBetween}>
                <img className={styles.logo} src={coin.image} width='60px'/>
                
                <div className={styles.flexcolumn + ' ' + styles.aligntextleft}>
                    <h2>{coin.name}</h2>
                    <h4 style={{opacity: 0.8}}>{coin.symbol}</h4>
                </div>
                
            </div> 
        </div> 
    ); 
}
 
export default UntrackedCoin;