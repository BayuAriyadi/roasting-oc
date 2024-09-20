interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  isDarkMode: boolean; // Menambahkan prop untuk mode
}

const Input = ({ value, onChange, placeholder, isDarkMode }: InputProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`p-3 border border-gray-300 rounded-lg 
        ${isDarkMode ? 'text-white bg-gray-800 placeholder:text-gray-400' : 'text-black bg-white placeholder:text-gray-500'} 
        w-full focus:outline-none focus:ring-2 focus:ring-blue-400`}
    />
  );
};

export default Input;
