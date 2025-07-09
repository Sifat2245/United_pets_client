import { Globe, Instagram, Mail, MapPin,  MessageCircleMore,  Twitter } from 'lucide-react';

const TopBar = () => {
    return (
        <div className="w-full bg-[#1446A0] text-white py-3 px-4 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
       
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm">
         
          <a href="https://www.google.com/maps?q=Narayanganj+Bangladesh" className="flex items-center font-semibold">
            <MapPin className="h-4 w-4 mr-2" />
            <span className='hover:text-[#D61C62] transition-all duration-200'>Narayanganj - Bangladesh</span>
          </a>
         
          <a href="mailto:mdsaifuddinahmed360@gmail.com" className="flex items-center font-semibold">
            <Mail className="h-4 w-4 mr-2" />
            <span className='hover:text-[#D61C62] transition-all duration-200'>mdsaifuddinahmed360@gmail.com</span>
            
          </a>
         
          <a href="whatsapp:+8801903321075" className="flex items-center font-semibold">
            <MessageCircleMore className="h-4 w-4 mr-2" />
            <span className='hover:text-[#D61C62] transition-all duration-200'>(+880) 1903-321075</span>
          </a>
        </div>

      
        <div className="flex items-center space-x-4 mt-3 md:mt-0">
        
          <a href="https://saifuddin-ahmed-sifat.web.app/" target='_blank' aria-label="Facebook" className="text-white hover:text-blue-300 transition-colors duration-200">
            <Globe className="h-5 w-5 hover:text-[#D61C62] transition-all duration-200" />
          </a>
         
          <a href="https://x.com/mdsifat1644976" target='_blank' aria-label="Twitter" className="text-white hover:text-blue-300 transition-colors duration-200">
            <Twitter className="h-5 w-5 hover:text-[#D61C62] transition-all duration-200" />
          </a>
         
          <a href="https://www.instagram.com/sifat_224/" target='_blank' aria-label="Instagram" className="text-white hover:text-blue-300 transition-colors duration-200">
            <Instagram className="h-5 w-5 hover:text-[#D61C62] transition-all duration-200" />
          </a>
        </div>
      </div>
    </div>
    );
};

export default TopBar;