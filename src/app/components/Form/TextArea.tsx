interface TextAreaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  isDarkMode: boolean; // Menambahkan props untuk mode
}

const TextArea = ({ value, onChange, placeholder, isDarkMode }: TextAreaProps) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`p-3 border border-gray-300 rounded-lg 
        ${isDarkMode ? 'text-white dark:bg-gray-800 placeholder:text-gray-400' : 'text-black bg-white placeholder:text-gray-500'} 
        w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-400`}
      rows={4}
    />
  );
};

export default TextArea;
