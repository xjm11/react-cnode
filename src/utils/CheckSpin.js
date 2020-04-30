import React from 'react';
import { Spin } from 'antd';

export function checkSpin(Component, isSpin = false) {
  return isSpin ? (
    <div style={{ paddingTop: '50px', textAlign: 'center' }}>
      <Spin />
    </div>
  ) : (
    Component
  );
}
