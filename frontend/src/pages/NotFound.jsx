import FuzzyText from '../components/ui/FuzzyText';
const NotFound = () => {
    return (
        <div className='flex items-center flex-col justify-center h-screen gap-8'>
            <FuzzyText
                baseIntensity={0.2}
                hoverIntensity={0.5}
                enableHover={true}
            >
                404
            </FuzzyText>
            <FuzzyText
                baseIntensity={0.2}
                hoverIntensity={0.5}
                enableHover={true}
            >
                Not Found
            </FuzzyText>
        </div>
    );
};
export default NotFound;
