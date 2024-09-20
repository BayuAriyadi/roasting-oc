interface TextAreaProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
  }
  
  const TextArea = ({ value, onChange, placeholder }: TextAreaProps) => {
    return (
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="p-3 border border-gray-300 rounded-lg w-full resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={4}
      />
    );
  };
  
  export default TextArea;
  