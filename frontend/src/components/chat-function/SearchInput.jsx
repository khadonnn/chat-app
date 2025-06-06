import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import debounce from 'lodash/debounce';

const SearchInput = ({ users, onResults, placeholder = 'Search...' }) => {
    const [query, setQuery] = useState('');

    useEffect(() => {
        const debounced = debounce(() => {
            if (query.trim() === '') {
                onResults(users); // nếu không search, trả về toàn bộ users
                return;
            }

            const filtered = users.filter((user) =>
                user.fullName.toLowerCase().includes(query.toLowerCase()),
            );

            onResults(filtered);
        }, 300);

        debounced();
        return () => debounced.cancel();
    }, [query, users]);

    return (
        <div className='form-control w-full h-10 max-w-sm mt-2 px-2'>
            <div className='input input-bordered flex items-center gap-2'>
                <Search className='w-5 h-5 text-base-content/60' />
                <input
                    type='text'
                    placeholder={placeholder}
                    className='grow outline-none'
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>
        </div>
    );
};

export default SearchInput;
