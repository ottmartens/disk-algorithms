import React, { useState, useEffect } from 'react';

import { useInterval } from '../../hooks';

import { Counter } from '..';

import styles from './visualizer.module.scss';

const Visualizer = ({
  pattern,
  algorithm,
  started,
  setStarted,
  setError,
  error
}) => {
  const [stepCount, setStepCount] = useState(0);

  useInterval(
    () => {
      step();
    },
    started ? 1000 : null
  );

  useEffect(() => {
    if (started) {
      setStepCount(0);
      setError('');
    }
  }, [setError, started]);

  const step = () => {
    console.log(stepCount);
    setStepCount(stepCount + 1);
  };

  return (
    <div className={styles.visualizer}>
      {pattern}
      {algorithm}
      <Counter stepCount={stepCount} />
    </div>
  );
};

export default Visualizer;
