/*
 * Name : Pietro Tollot
 * Module : serverNode
 * Location : source/private/presentations/presentation/RenamePresentation.js
 *
 */
//==============
// configuration
//==============

var config = require('../../../../config');
var database = config.database;
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID

//=========
// resource
//=========
var post = function(req, res){
																								
	MongoClient.connect(database, function(err, db) {
                      if(err) {
                      
                      console.log(err);
                      res.status(400);
                      res.json({
                               success: false,
                               message: err
                               });
                      }
							  var oldName_pres = req.originalUrl.split("/")[4];
							  var name_pres = req.originalUrl.split("/")[6];

							  db.collection('presentations'+req.user).update({ 'meta.titolo': oldName_pres }, {$set: { 'meta.titolo' : name_pres }}, function(err, doc){
                                              if(err) {
                                              
                                                               console.log(err);
                                                               res.status(400);
                                                               res.json({
                                                                        success: false,
                                                                        message: err
                                                                        });

                                                               
                                              }
																							 
																							 res.json({
																										 success: true,
																										 message: 'renamed presentation: '+name_pres
																										 });
																							 db.close();
																							 
																							 });
							  });
};


exports.post = post;