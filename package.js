Package.describe({
  summary: "Generate RSA Private and Public keys in meteor."
});

Package.on_use(function (api, where) {
  api.add_files('jsencrypt.js', 'client');
  api.export('JSEncrypt');
});
