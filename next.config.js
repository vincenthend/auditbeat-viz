/**
 * @type {import('next').NextConfig}
 */
const config = {
  reactStrictMode: true,
  transpilePackages: [
    '@ant-design/icons',
    '@antv/g6'
  ],
  experimental: { esmExternals: 'loose' }
}

module.exports = config
