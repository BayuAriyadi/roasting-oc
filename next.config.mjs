/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',  // Menambahkan hostname untuk avatar GitHub
                port: '',
                pathname: '/**',  // Mengizinkan semua path di bawah hostname ini
            },
        ],
    },
};

export default nextConfig; // Gunakan export default
