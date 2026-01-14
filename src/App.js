import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [name,setName] = useState('');
  const [datetime,setDatetime] = useState('');
  const [description,setDescription] = useState('');
  const [purchases,setPurchases]= useState([]);

  useEffect(() => {
    getPurchases().then(
      setPurchases);
  }, []);

  async function getPurchases() {
    const url = process.env.REACT_APP_API_URL + '/purchases';
    const response= await fetch(url);
    return await response.json();
  }

  function addNewPurchase(ev) {
    ev.preventDefault();
    const url = process.env.REACT_APP_API_URL + '/purchase';
    const price = name.split(' ')[0];
    fetch(url, {
      method: 'POST',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify({name: name.substring(price.length+1), price, description, datetime})
    }).then(response => {
      response.json().then(json => {
        setName('');
        setDatetime('');
        setDescription('');
        console.log('result', json);
      })
    });
  }
  let balance= 50;
  for (const purchase of purchases) {
    balance= balance + purchase.price;
  }

  const balance_str= balance.toFixed(2);
  const cents= balance_str.split('.')[1];

  return (
    <main>
      <h1>${balance}<span>.{cents}</span></h1>
      <form onSubmit={addNewPurchase}>
        <div className='basic'>
          <input type="text" value={name} onChange={ev => setName(ev.target.value)} placeholder='+$20 new notebook'/>
          <input type="datetime-local" value={datetime} onChange={ev => setDatetime(ev.target.value)} />
        </div>
        <div className='description'>
          <input type="text" value={description} onChange={ev => setDescription(ev.target.value)} placeholder='description'/>
        </div>
        <button type='submit'>Add new purchase</button>
      </form>
      <div className='purchases'>
        {purchases.length > 0 && purchases.map(purchase => (
          <div className='purchase'>
          <div className='left'>
            <div className='name'>{purchase.name}</div>
            <div className='description'>{purchase.description}</div>
          </div>
          <div className='right'>
            <div className='price'>${purchase.price}</div>
            <div className='datetime'>{purchase.datetime}</div>
          </div>
        </div>
        ))}
        <div className='purchase'>
          <div className='left'>
            <div className='name'>New notebook</div>
            <div className='description'>for learning and taking notes</div>
          </div>
          <div className='right'>
            <div className='price'>$20</div>
            <div className='datetime'>12/11/2025 17:35</div>
          </div>
        </div>
        <div className='purchase'>
          <div className='left'>
            <div className='name'>New pens</div>
            <div className='description'>for pretty note-taking </div>
          </div>
          <div className='right'>
            <div className='price'>$30</div>
            <div className='datetime'>15/11/2025 10:30</div>
          </div>
        </div>
        
      </div>
    </main>
  );
}

export default App;
