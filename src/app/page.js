"use client";
import React, { useState, useEffect } from 'react';

export default function Home() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRate, setExchangeRate] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);

  
  // Common currency codes
  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR'];

  // Mock exchange rate API (replace with real API in production)
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        // In a real app, use a currency exchange rate API
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        setExchangeRate(rate);
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
        // Fallback rates for demonstration
        const mockRates = {
          'USD-EUR': 0.92,
          'EUR-USD': 1.09,
          'USD-GBP': 0.79,
          'GBP-USD': 1.26
        };
        const key = `${fromCurrency}-${toCurrency}`;
        setExchangeRate(mockRates[key] || 1);
      }
    };

    fetchExchangeRate();
  }, [fromCurrency, toCurrency]);

  // Conversion calculation
  useEffect(() => {
    setConvertedAmount((amount * exchangeRate).toFixed(2));
  }, [amount, exchangeRate]);

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Currency Converter</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div className="flex mb-4 space-x-4">
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-2">From Currency</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {currencies.map(currency => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>
        
        <div className="w-1/2">
          <label className="block text-sm font-medium mb-2">To Currency</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full p-2 border rounded"
          >
            {currencies.map(currency => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-xl font-semibold">
          {amount} {fromCurrency} = {convertedAmount} {toCurrency}
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Exchange Rate: 1 {fromCurrency} = {exchangeRate.toFixed(4)} {toCurrency}
        </p>
      </div>
    </div>
  );
}
