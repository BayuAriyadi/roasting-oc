interface SubmitButtonProps {
  loading: boolean;
}

const SubmitButton = ({ loading }: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className={`btn  bg-customButton hover:bg-customButtonHover ${
        loading ? "cursor-not-allowed" : ""
      }`}
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
