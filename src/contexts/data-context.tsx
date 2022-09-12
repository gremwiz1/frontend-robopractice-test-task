import React from 'react';
import { IData } from '../utils/types';
export const DataContext = React.createContext<IData>({data:[]});