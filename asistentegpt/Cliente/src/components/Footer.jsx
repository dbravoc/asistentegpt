import LWT from "../assets/img/Bucont - Frame 8.jpeg";
import MHG from "../assets/img/m.jpeg";


export default function Footer() {
    return (
      <div className="bg-white py-10 ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 border-t-2">
          <h2 className="text-center text-lg font-semibold leading-8 text-gray-700 pt-10 pb-5">
            Nuestros colaboradores
          </h2>
          <div className="flex justify-center items-center gap-x-20 gap-y-10 sm:gap-x-30">
            <a href="">
            <img
              className="max-h-20 w-auto object-contain"
              src={MHG}
              alt="Transistor"
              width={200}
              height={48}
            />
            </a>
            <a href="">
            <img
              className="w-auto max-h-10 object-contain"
              src={LWT}
            />
            </a>
          </div>
        </div>
      </div>
    );
  }
  