/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['argobot-bucket.s3-website.us-east-2.amazonaws.com', 'argobot-bucket.s3.us-east-2.amazonaws.com']
  }
}
// working
export default nextConfig
