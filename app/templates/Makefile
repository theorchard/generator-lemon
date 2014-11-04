install:
	pyvenv env && \
		source env/bin/activate && \
		pip install -r requirements.txt
<% if (package.enableI18n) { %>


extract_messages:
	source env/bin/activate; \
		pybabel extract \
			-F configs/babel.cfg \
			-o <%= package.appName %>/translations/messages.pot .


create_locale:
	source env/bin/activate; \
		pybabel init \
			-i <%= package.appName %>/translations/messages.pot \
			-d <%= package.appName %>/translations -l $(locale)


compile_messages:
	source env/bin/activate; \
		pybabel compile -d <%= package.appName %>/translations<% } %>
