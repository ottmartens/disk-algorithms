import React from 'react';

import styles from './counter.module.scss';

const Counter = ({ stepCount }) => (
  <div className={styles.counter}>
    <div>
      tick count: <span className={styles.number}>{stepCount}</span>
    </div>
  </div>
);

export default Counter;
