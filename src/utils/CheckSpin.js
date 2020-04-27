import React from 'react';
import { Spin } from 'antd';

export function checkSpin(Component, isSpin = false) {
  return isSpin ? (
    <div style={{ 'padding-top': '50px', 'text-align': 'center' }}>
      <Spin />
    </div>
  ) : (
    Component
  );
}
