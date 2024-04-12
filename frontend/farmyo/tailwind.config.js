/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      spacing: {
        "50px": "50px", // 커스텀 스페이싱 추가
        "100px": "110px",
        "89px" : "89px" // 하단 네비게이션바
      },
    },
  },
  plugins: [require("daisyui")],
};
