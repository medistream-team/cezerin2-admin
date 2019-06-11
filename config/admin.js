// config used by dashboard client side only
module.exports = {
	// dashboard UI language
	language: process.env.LANGUAGE || 'en',
	apiBaseUrl:
		process.env.API_BASE_URL || 'https://marketapi.medistream.co.kr/api/v1',
	assetsBaseURL:
		process.env.ASSETS_BASE_URL || 'https://warehouse.medistream.co.kr',
	apiWebSocketUrl:
		process.env.API_WEB_SOCKET_URL || 'wss://marketapi.medistream.co.kr'
	// developerMode: process.env.DEVELOPER_MODE || true
};
