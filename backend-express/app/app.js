const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
require('dotenv-flow').config();

const indexRouter = require('./routes/index');
const {getAllComposers, getContactData} = require("./utils/db-utils");
const console = require("node:console");

const app = express();
const LOG = require('./logger')(module);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

LOG.info('**** Classical Composers Service ****');



const corsOpts = {
	origin: ['http://localhost:3000'],
	optionsSuccessStatus: 200
};

app.use( cors( corsOpts ) );
app.use( '/', indexRouter);
app.get('/composers-list', async (req, res, next) => {
	try {
		const data = await getAllComposers();
		if (!data) throw new Error('Internal Server Error')

		res.status(200).json(data);
	} catch (error) {
		next(error)
	}
})

app.get('/composer-contact-data/:composerId', async (req, res, next) => {
	try {
		console.log('enter --> composer-contact-data');
		const composerId = req.params.composerId;
		console.log('composerId -->', composerId);
		const contactData = await getContactData(composerId);
		console.log('getComposerContactData -->', contactData);
		if (!contactData) throw new Error('Internal Server Error');
		res.status(200).json(contactData);
	} catch (error) {
		next(error)
	}
})
// Error handler should be last
app.use(function errorHandler(err, req, res, next) {
	if ( !err.logged ) LOG.error(err);
	if ( res.headersSent ) return next(err);

	res.status( 500 ).json({ data: `${err.message} \n ${err.stack}`});
});


LOG.info('**** Initialized        ****');

module.exports = app;
