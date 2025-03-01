const Badge = ({ children, color }) => {
    const badgeColors = {
      red: "bg-red-500 text-white",
      green: "bg-green-500 text-white",
      blue: "bg-blue-500 text-white",
      gray: "bg-gray-300 text-black",
    };
  
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${badgeColors[color] || badgeColors.gray}`}
      >
        {children}
      </span>
    );
  };
  
  export default Badge;
  