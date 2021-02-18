import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const getRandomIntByRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const Scrambler = ({ className, delay, iterations, text }) => {
  const [renderedText, setRenderedText] = useState(text);
  const [scrambleState, setScrambleState] = useState(0);

  const getJibberish = (length) => {
    const characters = {};

    characters.consonants = [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`];

    characters.vowels = [`X`, `$`, `%`, `#`, `x`];
    characters.result = ``;

    characters.getLetter = (datasource) => {
      const key = Math.floor(Math.random() * datasource.length);
      return datasource[key];
    };

    let loopStat = 0;

    while (loopStat < length) {
      if (loopStat === null || loopStat % 2) {
        characters.result += characters.getLetter(characters.vowels);
      } else {
        characters.result += characters.getLetter(characters.consonants);
      }

      loopStat += 1;
    }

    return characters.result;
  };

  //

  useEffect(() => {
    let scrambleIterations = iterations;

    if (!scrambleIterations) {
      scrambleIterations = text.length - renderedText.length;

      if (scrambleIterations < 0) {
        scrambleIterations = -scrambleIterations;
      }

      if (scrambleIterations < 20) {
        scrambleIterations = 20;
      }
    }

    setScrambleState(scrambleIterations);
  }, [text, iterations]);

  useEffect(() => {
    if (!window) {
      return () => {};
    }

    if (scrambleState === 0) {
      setRenderedText(text);

      return () => {};
    }

    //

    let jibberishLength = getRandomIntByRange(text.length - 3, text.length);

    if (jibberishLength < 2) {
      jibberishLength = 2;
    }

    setRenderedText(getJibberish(jibberishLength));

    //

    const scrambleTimeout = setTimeout(() => {
      setScrambleState(scrambleState - 1);
    }, 35);

    return () => {
      clearTimeout(scrambleTimeout);
    };
  }, [scrambleState]);

  //

  return <span className={`scrambler ${className}`}>{renderedText}</span>;
};

Scrambler.defaultProps = {
  className: ``,
  delay: 0,
  iterations: null,
};

Scrambler.propTypes = {
  className: PropTypes.string,
  delay: PropTypes.number,
  iterations: PropTypes.number,
  text: PropTypes.string.isRequired,
};

export default Scrambler;
