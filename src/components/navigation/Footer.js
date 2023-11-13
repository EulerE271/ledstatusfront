import React from 'react';

function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-36">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/4 text-center md:text-left mb-4 md:mb-0">
                        <h5 className="uppercase mb-4">Snabblänkar</h5>
                        <ul className="list-none">
                            <li className="mb-2"><a href="/" className="hover:underline">Hem</a></li>
                            <li className="mb-2"><a href="/" className="hover:underline">Sök</a></li>
                            <li><a href="/trails" className="hover:underline">Vandringsleder</a></li>
                        </ul>
                    </div>

                    <div className="w-full md:w-1/4 text-center md:text-right">
                        <h5 className="uppercase mb-4">Kontakt</h5>
                        <p className="mb-2">Email: info@ledstatus.se</p>
                    </div>
                </div>
            </div>
            <div className="text-center mt-4 border-t pt-4 border-gray-700">
                <p>© {new Date().getFullYear()} Ledstatus.se</p>
            </div>
        </footer>
    );
}

export default Footer;
