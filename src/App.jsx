import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(1);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
          setExchangeRate(data.rates[toCurrency]);
        });
    }
  }, [fromCurrency, toCurrency]);

  const handleConvert = () => {
    setConvertedAmount(amount * exchangeRate);
  };

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <div className="converter">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="INR">INR</option>
          {/* Add more currencies as needed */}
        </select>
        <span>to</span>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="INR">INR</option>
          {/* Add more currencies as needed */}
        </select>
        <button onClick={handleConvert}>Convert</button>
      </div>
      <h2>
        {amount} {fromCurrency} = {convertedAmount.toFixed(2)} {toCurrency}
      </h2>
    </div>
  );
}

export default App;
