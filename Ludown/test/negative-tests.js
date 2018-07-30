/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
var chai = require('chai');
var assert = chai.assert;
const parseFileContents = require('../lib/parseFileContents');
const testcases = require('./testcases/testcases-data');
const {exec} = require('child_process');
var path = require('path');
const ludown = path.resolve('./bin/ludown');

describe('Negative tests', function() {

    it('should show ERR message when no utterances are found for an intent', function(done) {
        exec(`node ${ludown} parse toluis --in ./test/testcases/bad3.lu`, (error, stdout, stderr) => {
            try {
                assert.equal(stderr.includes('does not have list decoration. Prefix line with "-" or "+"'), true);
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('should show ERR message when no labelled value is found for an entity', function(done) {
        exec(`node ${ludown} parse toluis --in ./test/testcases/bad3a.lu`, (error, stdout, stderr) => {
            try {
                assert.equal(stderr.includes('No labelled value found for entity:'),true);
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('should show ERROR when no parser decorations are found in a line', function(done) {
        exec(`node ${ludown} parse toluis --in ./test/testcases/bad2.lu`, (error, stdout, stderr) => {
            try {
                assert.equal(stderr.includes('not part of a Intent/ Entity/ QnA'), true);
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });

    it('should show WARN message when an answer is missing for qna pair', function(done) {
        exec(`node ${ludown} parse toqna --in ./test/testcases/bad.lu`, (error, stdout, stderr) => {
            try {
                assert.equal(stderr.includes('No answer found for question:'), true);    
                done();
            } catch (err) {
                done(err);
            }
            
        });
    });
});