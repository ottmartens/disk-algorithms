import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Label,
  ResponsiveContainer
} from 'recharts';

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
  const [scannedPositions, setScannedPositions] = useState([10]);
  const [unvisitedPositions, setUnvisitedPositions] = useState(pattern);

  useInterval(
    () => {
      step();
    },
    started ? 700 : null
  );

  useEffect(() => {
    reset();
  }, [pattern]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (started) {
      setStepCount(0);
      setError('');
    }
  }, [setError, started]);

  const reset = () => {
    setStepCount(0);
    setUnvisitedPositions(pattern);
    setScannedPositions([10]);
    setStarted(false);
  };

  const step = () => {

    let position;

    switch (algorithm) {
      case 'FCFS':
        position = unvisitedPositions.shift();
        break;
      default:
        break;
    }

    setScannedPositions(scannedPositions.concat([position]));

    setStepCount(stepCount + 1);

    if (unvisitedPositions.length === 0) {
      setStarted(false);
    }
  };

  return (
    <div className={styles.visualizer}>
      <ResponsiveContainer
        width="90%"
        height={(scannedPositions.length + 1) * 40}
      >
        <LineChart
          layout="vertical"
          data={scannedPositions.map((value, index) => ({
            index,
            value
          }))}
        >
          <XAxis
            domain={[0, 49]}
            tickCount={50}
            interval={0}
            orientation="top"
            type="number"
          >
            <Label
              offset={-5}
              position="insideTop"
              value="Head position"
              style={{
                fontSize: '85%',
                fill: 'rgba(255, 255, 255, 0.87)'
              }}
            />
          </XAxis>
          <YAxis
            domain={[0, scannedPositions.length]}
            ticks={[...scannedPositions.keys()]}
            interval={0}
            dataKey="index"
            type="number"
          />
          <Line dataKey="value" stroke="#8884d8" />
          <Tooltip
            labelFormatter={label =>
              label === 0 ? `Initial position` : `Step: ${label}`
            }
            formatter={value => [`Position: ${value}`, null]}
            isAnimationActive={false}
            active={!started && scannedPositions.length > 1}
          />
        </LineChart>
      </ResponsiveContainer>
      <Counter stepCount={stepCount} />
    </div>
  );
};

export default Visualizer;
