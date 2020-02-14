import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quoteData, setQuoteData] = useState();
  const [color, setColor] = useState();

  useEffect(() => {
    getQuote();
    generateColor()
    }, []);

    const getQuote = () => {
      fetch('https://type.fit/api/quotes')
      .then(reponse => reponse.json())
      .then(reponse => setQuoteData(reponse));
    }

    const generateColor = () => {
      for (var i = 0, random = []; i < 3; i++) {
        random.push(Math.floor(Math.random()*256));
      }
      document.body.style.background = 'rgb(' + random.join(', ') + ')'
      setColor('rgb(' + random.join(', ') + ')'); 
    }

  return (
     <div className="center" id="quote-wrapper">
        {quoteData && (
          <blockquote style={{color: color}}>
            {quoteData[0].text}
            <footer className="blockquote-footer">
            {quoteData[0].author}
            </footer>
          </blockquote>
        )}
        <button style={{color: color}} className="btn">Twitter</button>
        <button style={{color: color}} className="btn">Tumblr</button>

        <button style={{color: color}} className="btn btn-right" onClick={() => {
          getQuote()
          generateColor()
        }}>New Quote</button>
      </div>
  );
}

export default App;
