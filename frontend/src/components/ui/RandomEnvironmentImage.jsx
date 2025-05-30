import { useEffect, useState } from 'react';

const RandomUnsplashLandscape = ({
    query = 'environment',
    className = '',
    children,
}) => {
    const [imageUrl, setImageUrl] = useState('');
    const fallbackImage = '/background.avif';

    useEffect(() => {
        const fetchImage = async () => {
            try {
                let image;
                let attempts = 0;
                const maxAttempts = 5;

                while (attempts < maxAttempts) {
                    const res = await fetch(
                        `https://api.unsplash.com/photos/random?query=${query}&client_id=${
                            import.meta.env.VITE_UNSPLASH_ACCESS_KEY
                        }`,
                    );

                    if (!res.ok) {
                        throw new Error(`Unsplash API error: ${res.status}`);
                    }

                    const data = await res.json();
                    if (data.width > data.height) {
                        image = data;
                        break;
                    }

                    attempts++;
                }

                if (image?.urls?.full) {
                    setImageUrl(image.urls.full);
                } else {
                    setImageUrl(fallbackImage);
                }
            } catch (err) {
                console.error('Error fetching Unsplash image:', err);
                setImageUrl(fallbackImage);
            }
        };

        fetchImage();
    }, [query]);

    return (
        <div
            className={`h-[110vh] bg-cover bg-center bg-fixed ${className}`}
            style={{
                backgroundImage: `url(${imageUrl || fallbackImage})`,
            }}
        >
            {!imageUrl && (
                <p className='text-center pt-20 text-gray-500'>
                    Loading background...
                </p>
            )}
            {imageUrl && children}
        </div>
    );
};

export default RandomUnsplashLandscape;
