const req = require.context("./svg", false, /\.svg$/);

const requireAll = (requireContext: __WebpackModuleApi.RequireContext) => {
  return requireContext.keys().map(requireContext);
};

requireAll(req);
