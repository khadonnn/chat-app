import { memo } from 'react';
import SplitText from './ui/SplitText.jsx';

const handleAnimationComplete = () => {
    console.log('All letters have animated!');
};

const SplitTextGsap = memo(({ mode }) => {
    const displayText = mode === 'create' ? 'Create Account' : 'Login';
    return (
        <SplitText
            text={displayText}
            className='text-2xl font-semibold text-center'
            delay={100}
            duration={0.6}
            ease='power3.out'
            splitType='chars'
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin='-100px'
            textAlign='center'
            onLetterAnimationComplete={handleAnimationComplete}
        />
    );
});
export default SplitTextGsap;
