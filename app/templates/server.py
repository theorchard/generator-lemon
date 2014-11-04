from <%= package.appName %> import routes
from <%= package.appName %>.app import app

app.run(<%= (package.isDebug ? 'debug=True' : '') %>)
