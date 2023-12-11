import loder from '../assets/34338d26023e5515f6cc8969aa027bca.gif';

const Loading = () => {

    return (
        <div className='flex min-h-screen w-full justify-center items-center'>
            <img className='w-[40%] md:w-[30%] lg:w-[20%]' src={loder} alt="" />
        </div>
    );
};

export default Loading;