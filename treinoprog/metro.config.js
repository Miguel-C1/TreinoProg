'use strict';

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const path = require('path');

const config = {
    watchFolders: [
        path.resolve(__dirname, 'node_modules'),
        path.resolve(__dirname, 'assets'),
    ],
    resolver: {
        blockList: exclusionList([/buck-out/, /sdks\/hermes/]),
        extraNodeModules: {
            'react-native': path.resolve(__dirname, 'node_modules/react-native'),
        },
    },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
