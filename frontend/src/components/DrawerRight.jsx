import { FileText, Image, SquareChevronLeft } from 'lucide-react';

const DrawerRight = () => {
    return (
        <div className='drawer drawer-end'>
            <input id='my-drawer-4' type='checkbox' className='drawer-toggle' />
            <div className='drawer-content'>
                <label
                    htmlFor='my-drawer-4'
                    className='drawer-button btn btn-xs !px-0 tooltip tooltip-left'
                    data-tip='open sidebar'
                >
                    <SquareChevronLeft />
                </label>
            </div>
            <div className='drawer-side'>
                <label
                    htmlFor='my-drawer-4'
                    aria-label='close sidebar'
                    className='drawer-overlay'
                ></label>
                <ul className='menu bg-base-200 text-base-content min-h-full w-80  [calc(100vh-8rem)] mt-16'>
                    {/* Collapse Item 1 */}
                    <li className='hover:bg-base-300 rounded-lg transition-all duration-300'>
                        <details className='collapse collapse-arrow'>
                            <summary className='collapse-title text-lg font-medium'>
                                Anh va file phuong tien
                            </summary>
                            <div className='collapse-content'>
                                <ul className='space-y-1'>
                                    <div className='p-2 rounded hover:bg-base-100 cursor-pointer flex gap-2 items-center'>
                                        <Image /> Image
                                    </div>
                                    <div className='p-2 rounded hover:bg-base-100 cursor-pointer flex gap-2 items-center'>
                                        <FileText /> File
                                    </div>
                                </ul>
                            </div>
                        </details>
                    </li>

                    {/* Collapse Item 2 */}
                    <li className='hover:bg-base-300 rounded-lg transition-all duration-300'>
                        <details className='collapse collapse-arrow'>
                            <summary className='collapse-title text-lg font-medium'>
                                Tuy chinh doan chat
                            </summary>
                            <div className='collapse-content p-2'>
                                <ul className='space-y-1'>
                                    <li className='p-2 rounded hover:bg-base-100 cursor-pointer'>
                                        Image
                                    </li>
                                    <li className='p-2 rounded hover:bg-base-100 cursor-pointer'>
                                        File
                                    </li>
                                </ul>
                            </div>
                        </details>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DrawerRight;
