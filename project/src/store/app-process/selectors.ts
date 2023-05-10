import { NameSpace } from '../../const';
import { State } from '../../types/store';

export const getFilter = (state: State) => state[NameSpace.App].filter;
