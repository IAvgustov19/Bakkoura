import {useContext} from 'react';
import {RootStoreContext} from '../store';

const useRootStore = () => useContext(RootStoreContext);
export default useRootStore;
