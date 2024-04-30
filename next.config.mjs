/** @type {import('next').NextConfig} */
// image placeholder: "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "daisyui.com",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
