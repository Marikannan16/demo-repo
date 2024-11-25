import { useState } from "react";

const ActionMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const optionClick = (value) => {
        setIsOpen(false);
        alert(`${value}`)
    }

    return (
        <div className="relative p-2 cursor-pointer" onClick={toggleMenu}>
            <svg className='relative h-5 w-5 cursor-pointer p-1' viewBox="0 0 5 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.5 9C1.5 9.23206 1.60536 9.45462 1.79289 9.61872C1.98043 9.78281 2.23478 9.875 2.5 9.875C2.76522 9.875 3.01957 9.78281 3.20711 9.61872C3.39464 9.45462 3.5 9.23206 3.5 9C3.5 8.76794 3.39464 8.54538 3.20711 8.38128C3.01957 8.21719 2.76522 8.125 2.5 8.125C2.23478 8.125 1.98043 8.21719 1.79289 8.38128C1.60536 8.54538 1.5 8.76794 1.5 9Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1.5 15.125C1.5 15.3571 1.60536 15.5796 1.79289 15.7437C1.98043 15.9078 2.23478 16 2.5 16C2.76522 16 3.01957 15.9078 3.20711 15.7437C3.39464 15.5796 3.5 15.3571 3.5 15.125C3.5 14.8929 3.39464 14.6704 3.20711 14.5063C3.01957 14.3422 2.76522 14.25 2.5 14.25C2.23478 14.25 1.98043 14.3422 1.79289 14.5063C1.60536 14.6704 1.5 14.8929 1.5 15.125Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M1.5 2.875C1.5 3.10706 1.60536 3.32962 1.79289 3.49372C1.98043 3.65781 2.23478 3.75 2.5 3.75C2.76522 3.75 3.01957 3.65781 3.20711 3.49372C3.39464 3.32962 3.5 3.10706 3.5 2.875C3.5 2.64294 3.39464 2.42038 3.20711 2.25628C3.01957 2.09219 2.76522 2 2.5 2C2.23478 2 1.98043 2.09219 1.79289 2.25628C1.60536 2.42038 1.5 2.64294 1.5 2.875Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

            {isOpen && (
                <div className="absolute -left-24 -top-3 bg-light border border-bordergray shadow-md rounded-md  w-24 p-2 z-50">
                    <span className="flex justify-start items-center gap-2" onClick={() => optionClick("Edit")}>
                        <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.67669 2.66969L13.33 6.32304M1 15H4.65334L14.2434 5.40998C14.4833 5.17009 14.6735 4.88531 14.8034 4.57189C14.9332 4.25847 15 3.92255 15 3.5833C15 3.24406 14.9332 2.90814 14.8034 2.59472C14.6735 2.2813 14.4833 1.99651 14.2434 1.75663C14.0035 1.51675 13.7187 1.32647 13.4053 1.19664C13.0919 1.06682 12.7559 1 12.4167 1C12.0775 1 11.7415 1.06682 11.4281 1.19664C11.1147 1.32647 10.8299 1.51675 10.59 1.75663L1 11.3467V15Z" stroke="black" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Edit
                    </span>
                    <span className="flex justify-start items-center gap-2" onClick={() => optionClick("Delete")}>
                        <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 4.11111H15M6.25 7.22222V11.8889M9.75 7.22222V11.8889M1.875 4.11111L2.75 13.4444C2.75 13.857 2.93437 14.2527 3.26256 14.5444C3.59075 14.8361 4.03587 15 4.5 15H11.5C11.9641 15 12.4092 14.8361 12.7374 14.5444C13.0656 14.2527 13.25 13.857 13.25 13.4444L14.125 4.11111M5.375 4.11111V1.77778C5.375 1.5715 5.46719 1.37367 5.63128 1.22781C5.79538 1.08194 6.01794 1 6.25 1H9.75C9.98206 1 10.2046 1.08194 10.3687 1.22781C10.5328 1.37367 10.625 1.5715 10.625 1.77778V4.11111" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
                        </svg>
                        Delete
                    </span>
                    <span className="flex justify-start items-center gap-2" onClick={() => optionClick("view")}>
                        <svg className="w-3.5 h-3.5" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.44444 5.99999C6.44444 6.47149 6.60833 6.92367 6.90006 7.25707C7.19178 7.59047 7.58744 7.77777 8 7.77777C8.41256 7.77777 8.80822 7.59047 9.09994 7.25707C9.39167 6.92367 9.55556 6.47149 9.55556 5.99999C9.55556 5.52849 9.39167 5.07631 9.09994 4.74291C8.80822 4.40951 8.41256 4.22221 8 4.22221C7.58744 4.22221 7.19178 4.40951 6.90006 4.74291C6.60833 5.07631 6.44444 5.52849 6.44444 5.99999Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}/>
                            <path d="M15 5.99999C13.1333 9.55555 10.8 11.3333 8 11.3333C5.2 11.3333 2.86667 9.55555 1 5.99999C2.86667 2.44443 5.2 0.666656 8 0.666656C10.8 0.666656 13.1333 2.44443 15 5.99999Z" stroke="black" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        View
                    </span>
                </div>
            )}
        </div>
    );
};

export default ActionMenu;