module.exports = {
    images: {
        domains: ['oscarexpert.nyc3.cdn.digitaloceanspaces.com'],
    },
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.externals.push('_http_common');
            config.externals.push('encoding');
        }
        return config;
    },
};
