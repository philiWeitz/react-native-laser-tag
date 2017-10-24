// @flow

export type BleDeviceType = {
  id: string,
  name: string,
  rssi: number,
};

export type BleCharDataType = {
  value: string,
  peripheral: string,
  characteristic: string,
};
