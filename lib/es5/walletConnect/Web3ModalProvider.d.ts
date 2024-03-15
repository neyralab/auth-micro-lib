import { ReactNode } from 'react';
import { State } from 'wagmi';
interface Web3ModalProviderProps {
    children: ReactNode;
    initialState?: State;
    projectId: string;
    metadata: {
        name: string;
        description: string;
        url: string;
        icons: string[];
    };
}
declare const Web3ModalProvider: ({ children, initialState, projectId, metadata }: Web3ModalProviderProps) => JSX.Element;
export default Web3ModalProvider;
