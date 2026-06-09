import { useTheme } from '@/contexts/theme';
import { GridLoader } from 'react-spinners';
export default function Loading() {
    const { theme } = useTheme();

    return (
        <>
            <div className={`flex justify-center items-center h-screen w-screen`}>
                <GridLoader
                    speedMultiplier={3}
                    color={`${theme === 'dark' ? 'white' : 'black'}`}
                />
            </div>
        </>
    );
}