import { RiSecurePaymentLine } from "react-icons/ri";
import { LuMessagesSquare } from "react-icons/lu";
import whatsApp from '../assets/4485687.png';

const Home = () => {
    document.title = 'Odommo | Home'
    return (
        <div className="overflow-hidden" data-aos='zoom-out'>
            {/* featare */}
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                    <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                        Welcome to Odommo <span className="text-red-500">TopUp</span>
                    </h2>
                    <p className="text-base text-gray-700 md:text-lg">
                        Fast digital transaction solution at hand
                    </p>
                </div>
                <div className="grid gap-8 row-gap-8 lg:grid-cols-3">
                    <div className="sm:text-center">
                        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
                            <svg
                                className="w-12 h-12 hover:scale-110 transition-all text-deep-purple-accent-400 sm:w-20 sm:h-20"
                                stroke="currentColor"
                                viewBox="0 0 52 52"
                            >
                                <polygon
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    fill="none"
                                    points="29 13 14 29 25 29 23 39 38 23 27 23"
                                />
                            </svg>
                        </div>
                        <h6 className="mb-2 font-semibold leading-5">Fast payment processing</h6>
                        <p className="max-w-md mb-3 text-sm text-gray-900 sm:mx-auto">
                            We process your payment as soon as possible <br /> after receiving it
                        </p>
                    </div>
                    <div className="sm:text-center">
                        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
                            <RiSecurePaymentLine className="text-6xl hover:scale-110 transition-all" />
                        </div>
                        <h6 className="mb-2 font-semibold leading-5">Secure transaction</h6>
                        <p className="max-w-md mb-3 text-sm text-gray-900 sm:mx-auto">
                            Your information is very important to us so we do all your transactions with 100% security
                        </p>
                    </div>
                    <a href="https://api.whatsapp.com/send/?phone=%2B8801768860000&text&type=phone_number&app_absent=0" target="_blank" rel="noreferrer">
                        <div className="sm:text-center">
                            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
                                <LuMessagesSquare className="text-6xl hover:scale-110 transition-all" />
                            </div>
                            <h6 className="mb-2 font-semibold leading-5">24/7 Support</h6>
                            <p className="max-w-md mb-3 text-sm text-gray-900 sm:mx-auto">
                                You can take help from us in any problem at any time. <br /> We are always by your side
                            </p>
                        </div>
                    </a>
                </div>
            </div>
            <div className="flex justify-end p-5 md:p-0">
                <a href="https://api.whatsapp.com/send/?phone=%2B8801768860000&text&type=phone_number&app_absent=0" target="_blank" rel="noreferrer">  <img className="w-12 cursor-pointer" src={whatsApp} alt="" /></a>
            </div>
        </div>
    );
};

export default Home;