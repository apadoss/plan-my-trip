const Footer = () => {
    return (
        <footer className="bg-black text-white py-4">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between">
                    {/* Sobre Nosotros */}
                    <div className="mb-4 md:mb-0 md:w-1/2 border-r border-white-500">
                        <h3 className="text-lg font-medium mb-2">About us</h3>
                        <p className="text-gray-300">LoremIpsum</p>
                        <p className="text-gray-300">LoremIpsum</p>
                    </div>
                    
                    {/* Contacto */}
                    <div className="md:w-1/2 md:pl-8">
                        <h3 className="text-lg font-medium mb-2">Contact</h3>
                        <p className="text-gray-300">Email: PlanMyTrip@gmail.com</p>
                        <p className="text-gray-300">Tlf: +34 12345678</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;