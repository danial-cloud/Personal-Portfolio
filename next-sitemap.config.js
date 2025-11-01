/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://muhammad-shehzad.com',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://muhammad-shehzad.com/server-sitemap.xml',
    ],
  },
  additionalPaths: async (config) => [
    await config.transform(config, '/blog'),
    await config.transform(config, '/services'),
    await config.transform(config, '/pricing'),
  ],
};
