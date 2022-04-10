import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';


import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import CoinGecko from '../api/CoinGecko/CoinGecko';
import UntrackedCoin from './UntrackedCoin';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  background: 'linear-gradient(180deg, #191a24 0%, #281c2c 100%);',
  border: '3px solid #281c2c',
  borderRadius: '5px',
  boxShadow: 24,
  p: 4,
  color: '#fff',
  overflowY: 'scroll', 
  maxHeight: '80%',
  
};


const AddCoin = ({trackedCoins, addCoin}) => {
    
    const [open, setOpen] = React.useState(false);
    const [isLoading, setIsLoading] = useState(true);


    const [untrackedCoins, setUntrackedCoins] = useState([]);
    const [visibleUntrackedCoins, setVisibleUntrackedCoins] = useState([]);


    const fetchAndFilterData = async (trackedCoins) => {
      const response = await CoinGecko.get('/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 500,
          ids: '',
        },
      });
      const more = response.data.filter(c => !trackedCoins.includes(c.id));
      
      setUntrackedCoins(more);
      setTimeout(() => {
      setIsLoading(false)}, 1000);
    };



      const searchCoin = (e) => {
        const search = e.target.value;
        const matched = untrackedCoins.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));
        setVisibleUntrackedCoins(matched);
      }


    const handleOpen = () => {
      if(untrackedCoins.length === 0 && trackedCoins.length != 0) {
        fetchAndFilterData(trackedCoins)
      }
      setOpen(true);

    }
    const handleClose = () => setOpen(false);
  
    
    const handleAdd = (coin) => {
      addCoin(coin);
      handleClose();
    }
    
    
    return ( 
      <div>
        
      <Button onClick={handleOpen} sx={{color: 'green'}}>Add Coins</Button>
        <Modal
          id="scrollable-modal-dialog"
          open={open}
          onClose={handleClose}
          style={{ overflow: 'none'}}
        > 
          <Box sx={style} className='scrollable'>
        {isLoading == true ? ( 
          <div>
        <h4>LOADING</h4>
        <div className="rocket">
          
          <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#fff"><g><rect fill="none" height="24" width="24"/></g><g><g><path d="M9.19,6.35c-2.04,2.29-3.44,5.58-3.57,5.89L2,10.69l4.05-4.05c0.47-0.47,1.15-0.68,1.81-0.55L9.19,6.35L9.19,6.35z M11.17,17c0,0,3.74-1.55,5.89-3.7c5.4-5.4,4.5-9.62,4.21-10.57c-0.95-0.3-5.17-1.19-10.57,4.21C8.55,9.09,7,12.83,7,12.83 L11.17,17z M17.65,14.81c-2.29,2.04-5.58,3.44-5.89,3.57L13.31,22l4.05-4.05c0.47-0.47,0.68-1.15,0.55-1.81L17.65,14.81 L17.65,14.81z M9,18c0,0.83-0.34,1.58-0.88,2.12C6.94,21.3,2,22,2,22s0.7-4.94,1.88-6.12C4.42,15.34,5.17,15,6,15 C7.66,15,9,16.34,9,18z M13,9c0-1.1,0.9-2,2-2s2,0.9,2,2s-0.9,2-2,2S13,10.1,13,9z"/></g></g></svg>
        </div></div>) : <div> 
        
            <TextField fullWidth label="Search" onChange={searchCoin}  variant="standard"
            InputLabelProps={{
              style: { color: '#fff'}, 
           }}
            InputProps={{style: { color: '#fff', borderColor: '#fff' }}}
            />
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr)'}}>
              {visibleUntrackedCoins.map(coin => <UntrackedCoin coin={coin} addCoin={handleAdd} key={coin.id}></UntrackedCoin>)}
            </div>
            
          </div>}
          
          </Box>
      </Modal></div> 
    );
}
 
export default AddCoin;