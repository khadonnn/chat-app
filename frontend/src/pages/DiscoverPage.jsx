import InfiniteMenuReact from '../components/InfiniteMenuReact.jsx';
import RotatingText from '../components/ui/RotatingText.jsx';
const CollectionPage = () => {
    return (
        <div className='max-w-5xl mx-auto p-4 py-8 mt-20 bg-primary/10 rounded-2xl'>
            <div className='text-3xl font-bold mb-10 '>
                Drag, explore more{' '}
                <RotatingText
                    texts={['Friend!', 'Chat!', 'Funny!', 'Cool!']}
                    mainClassName='inline-flex px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg'
                    staggerFrom={'last'}
                    initial={{ y: '100%' }}
                    animate={{ y: 0 }}
                    exit={{ y: '-120%' }}
                    staggerDuration={0.025}
                    splitLevelClassName='overflow-hidden pb-0.5 sm:pb-1 md:pb-1'
                    transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                    rotationInterval={2000}
                />
            </div>
            <div>
                <InfiniteMenuReact />
            </div>
            <div className='py-10 mt-10 flex items-center justify-center'>
                <div className='stats shadow'>
                    <div className='stat place-items-center'>
                        <div className='stat-title'>Downloads</div>
                        <div className='stat-value'>12K</div>
                        <div className='stat-desc'>
                            From January-1st To July-1st
                        </div>
                    </div>

                    <div className='stat place-items-center'>
                        <div className='stat-title'>Users</div>
                        <div className='stat-value text-secondary'>2,500</div>
                        <div className='stat-desc text-secondary'>
                            ↗︎ 40 (2%)
                        </div>
                    </div>

                    <div className='stat place-items-center'>
                        <div className='stat-title'>New Registers</div>
                        <div className='stat-value'>1,200</div>
                        <div className='stat-desc'>↘︎ 90 (14%)</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CollectionPage;
