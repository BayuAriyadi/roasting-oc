interface SubmitButtonProps {
  loading: boolean;
  isDarkMode: boolean; // Menambahkan prop untuk mode
}

const SubmitButton = ({ loading, isDarkMode }: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className={`btn ${
        isDarkMode
          ? "bg-white hover:bg-gray-500"
          : "bg-customButton hover:bg-customButtonHover"
      } ${loading ? "cursor-not-allowed" : ""}`}
      disabled={loading}
    >
      {loading ? (
        <>
          <span className="loading loading-spinner"></span>
          Generating Roast...
        </>
      ) : (
        "Roast!"
      )}
    </button>
  );
};

export default SubmitButton;
